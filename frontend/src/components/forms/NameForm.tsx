import { Button, Card, CardBody, CardFooter, Input, Typography } from "@material-tailwind/react/"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup'
import { CredentialsUser } from "../../models/types.d"
import { SpecificErrorMessage } from "../pure/SpecificErrorMessage"
import { useSocketActions } from "../../hooks/useSocketActions"

const loginSchema = Yup.object().shape({
    username: Yup.string().max(20, 'Máximo 20 caracteres')
        .required('El Nombre es obligatorio')
})

const initialCredentials: CredentialsUser = {
    username: ''
}

export default function NameForm(): JSX.Element {
    const { useRegister } = useSocketActions()
    const navigate = useNavigate()
    const handleSubmit = async (values: CredentialsUser, { setSubmitting }: FormikHelpers<CredentialsUser>) => {
        setSubmitting(false)
        useRegister(values.username)
        navigate('/preference')
    }

    return (
        <div className='place-content-center min-w-[90%]'>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
            >
                {({ touched, errors }) => (
                    <Form>
                        <Card className='' shadow={false} >
                            <CardBody className='p-0 ' >
                                <Typography variant="h5" color="black" className="py-3 text-start font-normal">
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
                                                size='md'
                                                className="p-0"
                                                containerProps={{
                                                    className: 'items-center'
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
                            <CardFooter className='flex flex-row justify-center space-x-2 p-0 pt-1 pb-20' >
                                <Button type='submit' fullWidth className='h-[3rem] px-10 bg-[#787A00] shadow-none'>
                                    <Typography variant="h6" >CONTINUAR</Typography> 
                                </Button>
                            </CardFooter>
                        </Card>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
