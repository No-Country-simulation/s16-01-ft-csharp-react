import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react/"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { Credentials } from "../../models/types.d"
import { SpecificErrorMessage } from "../pure/SpecificErrorMessage"

const loginSchema = Yup.object().shape({
    username: Yup.string().length(20, 'Máximo 20 caracteres')
        .required('El Nombre es obligatorio')
})

const initialCredentials: Credentials = {
    username: ''
}

export default function NameForm(): JSX.Element {
    const navigate = useNavigate()
    const handleSubmit = async (values: Credentials, { setSubmitting }: FormikHelpers<Credentials>) => {
        /* try {
          const res = await login(values).unwrap()
          if (res) {
            navigate('/dashboard')
          }
        } catch (error) {
          console.log(error)
        } */
        console.log(values)
        setSubmitting(false)
        navigate('/dashboard')
    }

    return (
        <div className=''>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors }) => (
                    <Form className=''>
                        <Card className='w-90%' shadow={false} >
                            <CardBody className='p-0' >
                                <Typography variant="h5" color="black" className="py-3 text-start">
                                    ¿Nos dirías tu nombre?
                                </Typography>
                                    <Field name='username' >
                                        {({ field }: { field: any }) => (
                                            <Input
                                                error={errors.username && touched.username && true}
                                                color='black'
                                                {...field}
                                                type='text'
                                                placeholder='Nombre'
                                                label='Nombre'
                                                size='lg'
                                                className="p-0"
                                                containerProps={{
                                                    className: 'max-w-[90%] items-center'
                                                }}
                                            />
                                        )}
                                    </Field>
                                    {errors.username && touched.username ? (
                                        <ErrorMessage className='h-5 text-[0.8rem] text-start pl-1 text-black' name='username'>
                                            {msg => <SpecificErrorMessage>{msg}</SpecificErrorMessage>}
                                        </ErrorMessage>
                                    ) : (
                                        <div className='h-5' />
                                    )}
                            </CardBody>
                            <CardFooter className='flex flex-row justify-center space-x-2' >
                                <Button type='submit' color='white' className='border-[0.1rem] border-black py-3 px-10' >
                                    Button
                                </Button>
                                <Button type='submit' color='black' className='py-3 px-10'>
                                    Button
                                </Button>
                            </CardFooter>
                        </Card>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
