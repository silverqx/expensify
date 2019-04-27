import React from 'react'

const FormErrors = ({ errors }) => (
    <div>
        {
            errors &&
                errors.map((error, index) => (
                    <div key={index}>{error}</div>
                ))
        }
    </div>
)

export default FormErrors
