import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography } from "@material-tailwind/react";
import Star from '../../assets/Star';
import { useUserActions } from '../../hooks/useUserActions';
import { SpecificErrorMessage } from '../pure/SpecificErrorMessage';

interface SurveyValues {
  score: number;
  feedback: string;
}

const SurveyForm: React.FC = () => {
  const initialValues: SurveyValues = { score: 0, feedback: '' };
  const { user, useSetUserStateState } = useUserActions();

  const validationSchema = Yup.object().shape({
    feedback: Yup.string().max(100, 'Máximo 100 caracteres'),
  });

  const handleSubmit = (values: SurveyValues) => {
    console.log({ survey: { user_id: user.user_id, ...values } });
    useSetUserStateState({ ...user.state, path: '/invoice', status: 1 })
  };

  const handleSkip = () => {
    useSetUserStateState({ ...user.state, path: '/invoice', status: 1 })
  }

  return (
    <div className="flex justify-center items-center">
      <div className="p-6">
        <Typography variant='lead' className='text-start font-medium pb-5'>
          ¿Qué calificación le darías a Hamburguesa Clásica simple?
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <div className="flex justify-start mb-7">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFieldValue('score', star)}
                    className={`text-3xl ${values.score >= star ? 'text-[#FFCA28]' : 'text-gray-400'}`}
                  >
                    <Star />
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <Typography variant='paragraph' color='black' className='font-semibold pb-4'>
                  Cuéntanos un poco más
                </Typography>
                <Field name="feedback">
                  {({ field }: { field: any }) => (
                    <div>
                      <Input {...field} label="" type="text" color="indigo" />
                    </div>
                  )}
                </Field>
                {errors.feedback && touched.feedback ? (
                    <ErrorMessage className='h-6 text-[0.8rem] text-start pl-1 text-black' name='feedback'>
                        {msg => <SpecificErrorMessage>{msg}</SpecificErrorMessage>}
                    </ErrorMessage>
                    ) : (
                        <div className='h-6' />
                    )}
              </div>
              <div className="flex justify-between gap-6">
                <Button variant="outlined" onClick={() => handleSkip()} color="black" fullWidth>
                  Omitir
                </Button>
                <Button variant="filled" type="submit" color="black" fullWidth>
                  Siguiente
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SurveyForm;
