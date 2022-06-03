const FormInput = props => (
    <div className="form-group my-3">
        <label htmlFor={props.id}>
            {props.text}
        </label>
        <input
            id={props.id}
            name={props.id}
            type={props.type}
            className="form-control"
            onChange={props.onChange}
        />
    </div>
);

const FormButton = props => {
    return (
        <button
            type="submit"
            className="btn btn-primary"
            disabled={props.disabled}
        >
            {props.text}
        </button>
    );
};

const FormErrors = props => {
    const errors = props.errors.map((error, index) => <li key={index}>{error}</li>)
    return (
        <ul>
            {errors}
        </ul>
    );
};

export { FormInput, FormButton, FormErrors };
