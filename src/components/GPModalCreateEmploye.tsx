import { useFormik, FormikErrors } from "formik";
import * as Yup from "yup";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  job: string;
  schedule_start: string;
  schedule_end: string;
}

interface ExtendedFormikErrors extends FormikErrors<FormValues> {
  submit?: string;
}

const GPModalCreateEmploye: React.FC<{
  handleOk: () => void;
  handleCancel: () => void;
}> = ({ handleOk, handleCancel }) => {
  const formik = useFormik<FormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      job: "",
      schedule_start: "",
      schedule_end: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Prénom est requis"),
      last_name: Yup.string().required("Nom est requis"),
      email: Yup.string().email("Email invalide").required("Email est requis"),
      phone_number: Yup.string().required("Numéro de téléphone est requis"),
      job: Yup.string().required("Métier est requis"),
      schedule_start: Yup.string().required("Début du planning est requis"),
      schedule_end: Yup.string().required("Fin du planning est requis"),
    }),
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const { schedule_start, schedule_end, ...rest } = values;
      const schedule = JSON.stringify({
        start: schedule_start,
        end: schedule_end,
      });

      console.log({ ...rest, schedule });
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...rest, schedule }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          setSubmitting(false);
          handleOk();
        })
        .catch((error) => {
          setErrors({
            submit: "Failed to create user: " + error.message,
          } as ExtendedFormikErrors);
          setSubmitting(false);
        });
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-10">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl mb-4">Formulaire de Création d'Utilisateur</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("first_name")}
              required
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <p className="text-red-500">{formik.errors.first_name}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("last_name")}
              required
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <p className="text-red-500">{formik.errors.last_name}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("email")}
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Numéro de téléphone
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("phone_number")}
              required
            />
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <p className="text-red-500">{formik.errors.phone_number}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Métier
            </label>
            <input
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("job")}
              required
            />
            {formik.touched.job && formik.errors.job ? (
              <p className="text-red-500">{formik.errors.job}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Début du Planning
            </label>
            <input
              type="datetime-local"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("schedule_start")}
              required
            />
            {formik.touched.schedule_start && formik.errors.schedule_start ? (
              <p className="text-red-500">{formik.errors.schedule_start}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Fin du Planning
            </label>
            <input
              type="datetime-local"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              {...formik.getFieldProps("schedule_end")}
              required
            />
            {formik.touched.schedule_end && formik.errors.schedule_end ? (
              <p className="text-red-500">{formik.errors.schedule_end}</p>
            ) : null}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded mr-2"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "En cours..." : "Créer"}
            </button>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleCancel}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GPModalCreateEmploye;
