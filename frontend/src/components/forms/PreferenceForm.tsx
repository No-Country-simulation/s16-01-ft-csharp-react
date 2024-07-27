import { Button, Card, CardBody, CardFooter, Input, Typography, Chip } from "@material-tailwind/react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { useState, useEffect, useRef } from "react";
import { SpecificErrorMessage } from "../pure/SpecificErrorMessage";
import { useUserActions } from "../../hooks/useUserActions";
import Plus from "../../assets/Plus";
import type { CredentialsPreference } from "../../models/types.d";

interface PreferenceFormProps {
  father: string;
  handleOpen?: () => void;
}

const restrictions = [
  "Gluten",
  "Lactosa",
  "Azúcar",
  "Huevo",
  "Carne de vacuno",
  "Pescado",
  "Mariscos",
  "Nueces",
  "Almendras",
  "Maní",
  "Soya",
  "Sésamo"
];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ father, handleOpen }) => {
  const { user, useSetUser } = useUserActions();
  const location = useLocation()
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLDivElement>(null);

  const preferenceSchema = Yup.object().shape({
    preferences: Yup.array()
      .of(Yup.string().max(20, 'Máximo 20 caracteres')) 
      .max(10, 'Máximo 10 preferencias') 
  });
  
  const initialCredentials: CredentialsPreference = {
    preferences: user.preferences.length > 0 ? user.preferences : []
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSuggestions(
      value ? restrictions.filter(restriction => restriction.toLowerCase().includes(value.toLowerCase())) : []
    );
  };

  const handleAddPreference = (
    preferences: string,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
    setFieldError: (field: string, message: string) => void,
    prefer_list: string[]
  ) => {
    try {
      const newPreferenceList = [...prefer_list, preferences];
      preferenceSchema.validateSync({ preferences: newPreferenceList });
      if (!prefer_list.includes(preferences)) {
        setFieldValue('preferences', newPreferenceList, true);
      }
    } catch (error) {
      setFieldError('preferences', (error as Yup.ValidationError).errors.join(', '));
    }
    setSearchTerm("");
    setSuggestions([]);
  };

  const handleRemovePreference = (
    preferences: string,
    setFieldValue: (field: string, value: string[], shouldValidate?: boolean) => void,
    prefer_list: string[]
  ) => {
    setFieldValue('preferences', prefer_list.filter(value => value !== preferences));
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: string[], shouldValidate?: boolean) => void,
    setFieldError: (field: string, message: string) => void,
    prefer_list: string[]
  ) => {
    if (event.key === 'Enter' && searchTerm && !restrictions.includes(searchTerm)) {
      event.preventDefault();
      handleAddPreference(searchTerm, setFieldValue, setFieldError, prefer_list);
    }
  };

  const handleSubmit = async (values: CredentialsPreference, { setSubmitting }: FormikHelpers<CredentialsPreference>) => {
    useSetUser({ ...user, preferences: values.preferences });
    setSubmitting(false);
    if (father === 'modal' && handleOpen) {
      handleOpen();
    } else if (location.pathname === '/preference' && father === 'page') {
      navigate('/home');
    }
  };

  const handleSkip = () => {
    if (father === 'modal' && handleOpen) {
      handleOpen();
    } else if (location.pathname === '/preference' && father === 'page') {
      navigate('/home');
    }
  };

  return (
    <div className='place-content-center min-w-[90%]'>
      <Formik
        initialValues={initialCredentials}
        validationSchema={preferenceSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, values, setFieldValue, setFieldError }) => (
          <Form>
            <Card shadow={false}>
              <CardBody className='p-0'>
                <Typography variant="h6" color="gray" className="py-1 text-start">
                  Selecciona el ingrediente
                </Typography>
                <Field name='preferences'>
                  {({ field }: { field: any }) => (
                    <div ref={inputRef}  className="relative flex items-center">
                      <Input
                        error={Boolean(errors.preferences && touched.preferences)}
                        color='black'
                        {...field}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onClick={() => setSuggestions(restrictions)}
                        onKeyDown={(event) => handleKeyDown(event, setFieldValue, setFieldError, values.preferences)}
                        type='text'
                        placeholder='Buscar'
                        label='Buscar'
                        size='md'
                        className="p-0 w-full"
                        containerProps={{
                          className: 'items-center relative'
                        }}
                      />
                      <button
                        type="button"
                        className="absolute right-2"
                        onClick={() => handleAddPreference(searchTerm, setFieldValue, setFieldError, values.preferences)}
                        disabled={!searchTerm}
                      >
                        <Plus />
                      </button>
                      {suggestions.length > 0 && (
                        <div className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-lg">
                          {suggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className="p-2 cursor-pointer hover:bg-gray-200 text-black"
                              onClick={() => handleAddPreference(suggestion, setFieldValue, setFieldError, values.preferences)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Field>
                {errors.preferences && touched.preferences && (
                  <ErrorMessage name='preferences' className='h-5 text-[0.8rem] text-start pl-1 text-black'>
                    {msg => <SpecificErrorMessage>{msg}</SpecificErrorMessage>}
                  </ErrorMessage>
                )}
                <div className="flex flex-wrap gap-1 min-h-8 pb-2 pt-2">
                  {values.preferences?.map((valor, index) => (
                    <Chip 
                      key={index} 
                      value={valor} 
                      onClose={() => handleRemovePreference(valor, setFieldValue, values.preferences)} 
                      animate={{ mount: { y: 0 }, unmount: { y: 20 } }}
                      size="sm"
                      className="text-[0.6rem] capitalize"
                    />
                  ))}
                </div>
              </CardBody>
              <CardFooter className='flex flex-row justify-center space-x-2 p-0 pt-10'>
                <Button onClick={handleSkip} color='white' className='border-[0.1rem] border-black py-3 px-10'>
                  {father === 'page' ? 'OMITIR' : 'CANCELAR'}
                </Button>
                <Button type='submit' color='black' className='py-3 px-10'>
                  {father === 'page' ? 'CONTINUAR' : 'ACEPTAR'}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
}
