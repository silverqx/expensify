import React from 'react'

// TODO write test for <FormErrors /> silver
const FormErrors = ({ errors }) => (
    <div className="form-errors">
        {
            errors &&
                errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))
        }
    </div>
)

export default FormErrors
