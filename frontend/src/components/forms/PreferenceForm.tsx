import { Button, Card, CardBody, CardFooter, Input, Typography, Chip } from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useState } from "react";
import { SpecificErrorMessage } from "../pure/SpecificErrorMessage";
import { useUserActions } from "../../hooks/useUserActions"

type CredentialsPreference = {
  preference: string[];
};

const preferenceSchema = Yup.object().shape({
  preference: Yup.array()
    .of(Yup.string().max(20, 'Máximo 20 caracteres'))
});

const initialCredentials: CredentialsPreference = {
  preference: []
};

const restrictions = ["No Maní", "No Azúcar", "No Gluten", "No Lactosa", "No Soja"];

export default function PreferenceForm(): JSX.Element {
  const { user, useSetUser } = useUserActions();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      setSuggestions(restrictions.filter(restriction =>
        restriction.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  };

  const handleAddPreference = (
    preference: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    setFieldError: (field: string, message: string) => void,
    prefer_list: string[]
  ) => {
    try {
      const newPreferenceList = [...prefer_list, preference];
      preferenceSchema.validateSync({ preference: newPreferenceList });
      if (!prefer_list.includes(preference)) {
        setFieldValue('preference', newPreferenceList, true);
      }
    } catch (error) {
      setFieldError('preference', JSON.stringify(error));
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemovePreference = (
    preference: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    prefer_list: string[]
  ) => {
    setFieldValue('preference', prefer_list.filter((value) => value !== preference));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void,
    setFieldError: (field: string, message: string) => void,
    prefer_list: string[]
  ) => {
    if (event.key === 'Enter' && searchTerm && !restrictions.includes(searchTerm)) {
      event.preventDefault();
      handleAddPreference(searchTerm, setFieldValue, setFieldError, prefer_list);
    }
  };

  const handleSubmit = async (values: CredentialsPreference, { setSubmitting }: FormikHelpers<CredentialsPreference>) => {
    console.log(values);
    useSetUser({ ...user, preference: values.preference });
    setSubmitting(false);
    navigate('/dashboard');
  };

  const handleSkip = () => {
    useSetUser({ ...user, preference: [] });
    navigate('/dashboard');
  };

  return (
    <div className='px-8'>
      <Formik
        initialValues={initialCredentials}
        validationSchema={preferenceSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, values, setFieldValue, setFieldError }) => (
          <Form className=''>
            <Card className='' shadow={false}>
              <CardBody className='p-0'>
                <Typography variant="h6" color="gray" className="py-1 text-start">
                  Selecciona qué tipo
                </Typography>
                <Field name='preference'>
                  {({ field }: { field: any }) => (
                    <>
                      <Input
                        error={Boolean(errors.preference && touched.preference)}
                        color='black'
                        {...field}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={(event) => handleKeyDown(event, setFieldValue, setFieldError, values.preference)}
                        type='text'
                        placeholder='Buscar'
                        label='Buscar'
                        size='md'
                        className="p-0"
                        containerProps={{
                          className: 'items-center'
                        }}
                      />
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg">
                          {suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="p-2 cursor-pointer hover:bg-gray-200"
                              onClick={() => handleAddPreference(suggestion, setFieldValue, setFieldError, values.preference)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </Field>
                {errors.preference && touched.preference ? (
                  <ErrorMessage className='h-5 text-[0.8rem] text-start pl-1 text-black' name='preference'>
                    {msg => <SpecificErrorMessage>{msg}</SpecificErrorMessage>}
                  </ErrorMessage>
                ) : (
                  <div className='h-5 text-[0.5rem]'>
                    <SpecificErrorMessage >
                      Puede escrbir y presionar enter también
                    </SpecificErrorMessage>
                    <SpecificErrorMessage >
                      Maximo 20 caracteres
                    </SpecificErrorMessage>
                  </div>
                )}
                <div className="flex flex-wrap gap-1 min-h-8 pb-2 pt-2" >
                  {values.preference && values.preference.map((valor, index) => (
                    <Chip 
                      key={index} 
                      value={valor} 
                      onClose={() => handleRemovePreference(valor, setFieldValue, values.preference)} 
                      animate={{
                        mount: { y: 0 },
                        unmount: { y: 20 },
                      }}
                      size="sm"
                      className="text-[0.6rem] capitalize"
                    />
                  ))}
                </div>
              </CardBody>
              <CardFooter className='flex flex-row justify-center space-x-2 p-0 pt-2'>
                <Button onClick={handleSkip} color='white' className='border-[0.1rem] border-black py-3 px-10'>
                  OMITIR
                </Button>
                <Button type='submit' color='black' className='py-3 px-10'>
                  CONTINUAR
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
