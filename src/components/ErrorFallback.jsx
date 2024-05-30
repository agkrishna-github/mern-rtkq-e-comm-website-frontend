import React from 'react'

function ErrorFallback({error}) {
 return (
        <div>
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    )
}

export default ErrorFallback
