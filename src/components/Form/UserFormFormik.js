import React, { useContext } from 'react'
import { Card, CardContent, Typography, Button } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import FormContext from '../../context/Form/FormContext'


export default function UserFormFormik() {

    const { dataForm, setForm } = useContext(FormContext);

    return (
        <Card>
            <CardContent>
                <FormikStepper
                    initialValues={{ ...dataForm }}
                    onSubmit={() => { }}
                >
                    <div>
                        <Field name="nombre" component={TextField} label="Ingrese su nombre" />
                        <Field name="apellido" component={TextField} label="Ingrese su apellido" />
                        <Field type="number" name="dni" component={TextField} label="Ingrese su dni" />
                    </div>
                    <div>
                        <Field name="mail" component={TextField} label="Ingrese su mail" />
                        <Field name="telefono" component={TextField} label="Ingrese su telefono" />
                    </div>
                </FormikStepper>
            </CardContent>
        </Card>
    )
}




export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children)
    const { step, setStep } = useContext(FormContext);
    const currentChild = childrenArray[step]

    return (
        <Formik {...props} onSubmit={async (values, helpers) => {
            if(step === childrenArray.length - 1){
                await props.onSubmit(values, helpers)
            }else{
                setStep(step + 1)
            }
        }}>
            <Form autoComplete="off">
                {currentChild}

                {step > 0 ? <Button onClick={() => setStep(step - 1)}>Back</Button> : null}
                <Button type='submit'>Next</Button>

            </Form>
        </Formik>
    )
}