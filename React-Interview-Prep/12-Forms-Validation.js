// ============================================================
// FORMS & VALIDATION IN REACT - COMPLETE INTERVIEW GUIDE
// ============================================================
// Topics: Controlled/Uncontrolled, React Hook Form, Formik,
//         Zod, Yup, Multi-step, File upload, Accessibility
// Interview Level: Mid to Senior
// ============================================================

// ============================================================
// 1. CONTROLLED vs UNCONTROLLED FORMS
// ============================================================

/**
 * Q: What's the difference between controlled and uncontrolled components?
 *
 * A:
 * Controlled: React state is the single source of truth.
 *   - onChange updates state, value from state
 *   - Full control: validation on every keystroke, conditional rendering
 *   - More re-renders
 *
 * Uncontrolled: DOM is the source of truth.
 *   - useRef to read value when needed
 *   - Less re-renders, simpler for simple forms
 *   - Used with defaultValue (not value)
 */

// Controlled component
function ControlledInput() {
  const [value, setValue] = React.useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

// Uncontrolled component
function UncontrolledForm() {
  const inputRef = React.useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputRef.current.value); // read on submit
  }

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

// When to use which:
// Controlled: dynamic validation, disable submit, format input on fly, dependent fields
// Uncontrolled: simple forms, file inputs, integrating with non-React code

// ============================================================
// 2. REACT HOOK FORM (Most Popular — Know This)
// ============================================================

/**
 * Q: Why is React Hook Form preferred over Formik?
 *
 * A:
 * - Uncontrolled by default → significantly fewer re-renders
 * - Smaller bundle (8KB vs 13KB for Formik)
 * - Built-in TypeScript support
 * - Native HTML validation integration
 * - register() API is simple and declarative
 * - Easy Zod/Yup integration via @hookform/resolvers
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Schema with Zod
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
  age: z.number({ invalid_type_error: 'Age must be a number' }).min(18, 'Must be 18+'),
  role: z.enum(['admin', 'user', 'moderator'], { required_error: 'Select a role' }),
  terms: z.literal(true, { errorMap: () => ({ message: 'Must accept terms' }) }),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type SignupForm = z.infer<typeof signupSchema>;

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    watch,
    reset,
    setError,
    setValue,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur', // validate on blur (or 'onChange', 'onSubmit', 'all')
    defaultValues: {
      name: '',
      email: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await createUser(data);
      reset(); // reset form on success
    } catch (err) {
      // Set server-side errors on specific fields
      setError('email', { message: 'Email already in use' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && <span id="name-error" role="alert">{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && <span id="email-error" role="alert">{errors.email.message}</span>}
      </div>

      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register('role')}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>
        {errors.role && <span role="alert">{errors.role.message}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('terms')} />
          Accept Terms & Conditions
        </label>
        {errors.terms && <span role="alert">{errors.terms.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting || !isDirty}>
        {isSubmitting ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}

// ============================================================
// 3. REACT HOOK FORM — ADVANCED PATTERNS
// ============================================================

// 3a. useFieldArray — dynamic/repeating fields
import { useFieldArray } from 'react-hook-form';

function DynamicSkillsForm() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: { skills: [{ name: '', level: 'beginner' }] }
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills',
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`skills.${index}.name`)} placeholder="Skill name" />
          <select {...register(`skills.${index}.level`)}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => append({ name: '', level: 'beginner' })}>
        Add Skill
      </button>
      <button type="submit">Save</button>
    </form>
  );
}

// 3b. watch — reacting to field changes
function WatchExample() {
  const { register, watch } = useForm();
  const subscriptionType = watch('subscription'); // watch single field
  const allValues = watch(); // watch all fields (perf: use sparingly)

  return (
    <form>
      <select {...register('subscription')}>
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </select>
      {subscriptionType === 'pro' && (
        <input {...register('billingEmail')} placeholder="Billing email" />
      )}
    </form>
  );
}

// 3c. Controller — for custom/third-party components
import { Controller } from 'react-hook-form';

function ControllerExample() {
  const { control } = useForm();
  return (
    <Controller
      name="rating"
      control={control}
      rules={{ required: true, min: 1 }}
      render={({ field, fieldState }) => (
        <StarRatingComponent
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}

// ============================================================
// 4. ZOD SCHEMA VALIDATION — DEEP DIVE
// ============================================================

/**
 * Q: Why use Zod over Yup?
 *
 * A:
 * - TypeScript-first: types are inferred from schema (no duplication)
 * - Immutable methods: each transformation returns a new schema
 * - More concise API
 * - Better tree-shaking
 * - Error messages are structured and easy to map to fields
 */

import { z } from 'zod';

// String validations
const stringSchema = z.string()
  .min(1, 'Required')
  .max(100, 'Too long')
  .trim()
  .email()
  .url()
  .regex(/pattern/, 'Invalid format')
  .startsWith('SK_', 'Must start with SK_')
  .includes('keyword', 'Must include keyword');

// Number validations
const numberSchema = z.number()
  .int('Must be integer')
  .positive('Must be positive')
  .min(0).max(100)
  .multipleOf(5);

// Optional and nullable
const optionalField = z.string().optional();    // string | undefined
const nullableField = z.string().nullable();    // string | null
const nullishField = z.string().nullish();      // string | null | undefined

// Default values
const withDefault = z.string().default('N/A');

// Object with nested schema
const addressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().length(2, 'Use 2-letter country code'),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP'),
});

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: addressSchema,
  tags: z.array(z.string()).min(1).max(10),
  metadata: z.record(z.string(), z.unknown()), // {[key: string]: unknown}
});

// Union and discriminated union
const shapeSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('circle'), radius: z.number() }),
  z.object({ kind: z.literal('rect'), width: z.number(), height: z.number() }),
]);

// Transform (parse + transform)
const coercedDate = z.string().transform(str => new Date(str));
const trimmedLower = z.string().trim().toLowerCase();

// .superRefine for complex cross-field validation
const passwordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });
  }
});

// Safe parse (doesn't throw)
const result = userSchema.safeParse(input);
if (!result.success) {
  const errors = result.error.flatten().fieldErrors;
  // errors.name → string[] | undefined
}

// ============================================================
// 5. YUP VALIDATION (still common in legacy codebases)
// ============================================================

import * as yup from 'yup';

const yupSchema = yup.object({
  name: yup.string().required('Name is required').min(2),
  email: yup.string().email('Invalid email').required(),
  age: yup.number().positive().integer().min(18, 'Must be 18+'),
  website: yup.string().url().nullable().optional(),
  password: yup.string().required(),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

// Usage with React Hook Form
import { yupResolver } from '@hookform/resolvers/yup';
const form = useForm({ resolver: yupResolver(yupSchema) });

// ============================================================
// 6. MULTI-STEP FORMS
// ============================================================

/**
 * Q: How do you implement multi-step forms in React?
 *
 * A: Maintain step index in state + collect all data in a shared state object.
 * Validate each step before allowing progress.
 * Consider React Hook Form context for shared form state across steps.
 */

const step1Schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

const step2Schema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  experience: z.number().min(0),
});

const step3Schema = z.object({
  plan: z.enum(['starter', 'pro', 'enterprise']),
  paymentMethod: z.enum(['card', 'invoice']),
});

function MultiStepForm() {
  const [step, setStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});

  const schemas = [step1Schema, step2Schema, step3Schema];
  const steps = [
    <Step1 />,
    <Step2 />,
    <Step3 />,
  ];

  const form = useForm({
    resolver: zodResolver(schemas[step]),
    defaultValues: formData,
  });

  const onNext = form.handleSubmit((data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(s => s + 1);
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const finalData = { ...formData, ...data };
    await submitRegistration(finalData);
  });

  return (
    <div>
      {/* Progress indicator */}
      <ol aria-label="Form steps">
        {['Profile', 'Company', 'Plan'].map((label, i) => (
          <li
            key={label}
            aria-current={i === step ? 'step' : undefined}
            className={i <= step ? 'completed' : ''}
          >
            {label}
          </li>
        ))}
      </ol>

      <form onSubmit={step < steps.length - 1 ? onNext : onSubmit}>
        {React.cloneElement(steps[step], { form })}

        <div>
          {step > 0 && (
            <button type="button" onClick={() => setStep(s => s - 1)}>
              Back
            </button>
          )}
          <button type="submit">
            {step < steps.length - 1 ? 'Next' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

// ============================================================
// 7. FILE UPLOAD IN REACT
// ============================================================

/**
 * Q: How do you handle file uploads securely in React?
 */

function FileUploadForm() {
  const [preview, setPreview] = React.useState(null);
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE_MB = 5;

  function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only JPEG, PNG, and WebP files are allowed';
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File must be smaller than ${MAX_SIZE_MB}MB`;
    }
    return null;
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    // Generate preview URL (clean up on unmount)
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview); // memory cleanup
    };
  }, [preview]);

  async function handleUpload(e) {
    e.preventDefault();
    const file = fileInputRef.current.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const { url } = await res.json();
      console.log('Uploaded:', url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleUpload}>
      <label htmlFor="avatar">Profile Picture</label>
      <input
        id="avatar"
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        aria-describedby={error ? 'file-error' : 'file-hint'}
      />
      <span id="file-hint">JPEG, PNG or WebP, max 5MB</span>
      {error && <span id="file-error" role="alert">{error}</span>}
      {preview && <img src={preview} alt="Preview" width={100} height={100} />}
      <button type="submit" disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

// ============================================================
// 8. FORM PERFORMANCE OPTIMIZATION
// ============================================================

/**
 * Q: How do you optimize form performance in React?
 *
 * A:
 * 1. React Hook Form: uncontrolled by default → no re-render on keystroke
 * 2. Avoid watch() on the entire form — watch specific fields
 * 3. Memoize form sections with React.memo
 * 4. Lazy validation: use mode: 'onBlur' instead of 'onChange'
 * 5. Split large forms into separate forms or sections
 * 6. Virtualize very long lists of form fields (react-window)
 */

// Expensive validation: debounce async validation
import { useForm } from 'react-hook-form';

function UsernameInput() {
  const { register, formState: { errors } } = useForm();

  return (
    <input
      {...register('username', {
        required: 'Username is required',
        minLength: { value: 3, message: 'Min 3 characters' },
        validate: {
          // Debounced async validation (check username availability)
          available: async (value) => {
            await new Promise(r => setTimeout(r, 500)); // debounce effect
            const taken = await checkUsernameAvailability(value);
            return taken ? 'Username is taken' : true;
          }
        }
      })}
    />
  );
}

// ============================================================
// FORMS QUICK REFERENCE
// ============================================================

/**
 * Library        | Bundle  | Re-renders  | TS Support | Schema Validation
 * --------------|---------|-------------|------------|-------------------
 * React HF       | 8KB     | Minimal     | Excellent  | Via resolvers
 * Formik         | 13KB    | Per field   | Good       | Via validationSchema
 * react-final-f  | 12KB    | Minimal     | Moderate   | Custom
 *
 * Validation Schema Libraries:
 * Zod   | TypeScript-first, infer types from schema, immutable
 * Yup   | JavaScript-first, more verbose, widely used in legacy code
 *
 * Recommendations:
 * - New project: React Hook Form + Zod
 * - Legacy project with Formik: likely has Yup, know both
 *
 * Key React Hook Form APIs to know:
 * register()        - connect input to RHF
 * handleSubmit()    - validates then calls your onSubmit
 * formState         - errors, isSubmitting, isValid, isDirty, dirtyFields
 * watch()           - subscribe to field changes
 * setValue()        - programmatically set a field value
 * setError()        - set server errors on specific fields
 * reset()           - reset form to defaults
 * useFieldArray()   - manage dynamic lists of fields
 * Controller        - wrapper for custom/third-party inputs
 */
