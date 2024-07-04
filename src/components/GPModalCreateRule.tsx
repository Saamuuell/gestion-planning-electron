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
}> = ({ handleOk }) => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl mb-4">Formulaire de Création de règle</h2>
        <form onSubmit={formik.handleSubmit}></form>
      </div>
    </div>
  );
};
export default GPModalCreateEmploye;
