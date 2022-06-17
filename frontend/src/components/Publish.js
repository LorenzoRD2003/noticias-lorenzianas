import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput, FormButton, FormErrors } from "./Form";

import NewsService from "../services/News";

const Paragraph = props => {
    return (
        <textarea
            defaultValue={props.text}
            className="textarea form-control mb-3"
            onChange={props.onChange}>
        </textarea>
    );
}

const NewsBody = props => {
    let body = props.paragraphs?.map((p, index) => (
        <Paragraph
            key={index}
            text={p}
            onChange={event => props.onChange(event, index)}
        />
    ));

    return (
        <>
            <h3>Cuerpo de la noticia</h3>
            {body}
        </>
    );
}

const Publish = props => {
    const [data, setData] = useState({
        author: props.user._id,
        headline: "",
        lead: "",
        body: [],
        category: "",
        tags: [],
        image: "http://placeimg.com/640/480" // TODO
    });
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // All this things are mandatory to enable the button
        if (!data.author || !data.headline || !data.lead || !data.body?.length || !data.category)
            return setDisabled(true);
        
        if (data.body.some(elem => elem.trim() === ""))
            return setDisabled(true);

        setDisabled(false); 
    }, [data]);

    const addParagraph = () => {
        const body = [...data.body];
        if (body.length && body[body.length - 1].trim() === "")
            return;

        body.push("");
        setData({
            ...data,
            body: body
        });
    }

    const handleChange = event => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    }

    const handleBodyChange = (event, index) => {
        const body = [...data.body];
        body[index] = event.target.value;

        setData({
            ...data,
            body: body
        });
    }

    const handleTagsChange = event => {
        const tags = event.target.value
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean);

        setData({
            ...data,
            tags: tags
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        setDisabled(true);

        try {
            const result = (await NewsService.create(data)).data;

            if (result.status == "FAILED")
                throw new Error(result.data.error);
            
            navigate("/profile");
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <h1>Escribir una noticia</h1>
            <form className="col-lg-6 col-md-6 col-sm-12" onSubmit={handleSubmit}>
                <FormInput
                    id="headline"
                    text="Título"
                    type="text"
                    onChange={handleChange}
                />
                <FormInput
                    id="lead"
                    text="Copete"
                    type="text"
                    onChange={handleChange}
                />
                <NewsBody
                    paragraphs={data.body}
                    onChange={handleBodyChange}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    disabled={false}
                    onClick={addParagraph}
                >
                    Añadir un párrafo
                </button>
                <FormInput
                    id="category"
                    text="Categoría"
                    type="text"
                    onChange={handleChange}
                />
                <FormInput
                    id="tags"
                    text="Etiquetas (separar por comas)"
                    type="text"
                    onChange={handleTagsChange}
                />
                <FormErrors errors={errors} />
                <FormButton text="Publicar" disabled={disabled} />
            </form>
        </>
    );
}

export default Publish;
