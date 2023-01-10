import React from 'react';
import Joi from '@hapi/joi';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '../../common/Form';
import { TextField } from '../../common/TextField';
import { useValidationResolver } from '../../hooks/useValidationResolver';

import './index.css';

const schema = Joi.object({
    filed_1: Joi.string().required(),
    filed_2: Joi.string().required(),
    filed_3: Joi.string().required(),
    filed_4: Joi.string().required(),
    filed_5: Joi.string().required(),
    filed_6: Joi.string().required(),
    filed_7: Joi.string().required(),
    filed_8: Joi.string().required(),
    filed_9: Joi.string().required(),
    filed_10: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().required(),
    discord_name: Joi.string().required(),
});

const SIZE_LIST = [
    { value: 'XSS', name: 'XSS' },
    { value: 'XS', name: 'XS' },
    { value: 'S', name: 'S' },
    { value: 'M', name: 'M' },
    { value: 'L', name: 'L' },
    { value: 'XL', name: 'XL' },
    { value: 'XXL', name: 'XXL' },
    { value: '3XL', name: '3XL' },
    { value: '4XL', name: '4XL' },
];

const NrcModal = (props) => {
    const { onClose, onSubmit, whiteListApplicationData, isLoading } = props;

    const { validationResolver } = useValidationResolver(schema);

    const {
        register,
        control,
        handleSubmit: onSubmitForm,
        formState: { errors: formErrors },
    } = useForm({
        validationResolver,
        defaultValues: whiteListApplicationData,
        mode: 'onSubmit',
    });

    const handleSubmit = onSubmitForm((data) => {
        onSubmit(data);
    });

    return (
        <>
            <div className="modal__content">
                <div className="modal__content--top">
                    <h2 className="modal__title">Get on Whitelist</h2>

                    <img
                        src="/assets/img/cross.svg"
                        alt="Cross"
                        className="modal__close"
                        onClick={onClose}
                    />
                </div>

                <div className="modal__content--bottom">
                    <p className="blue">Lissa Brand NFT Certificates</p>

                    <p className="create__item--text">To get on Whitelist let us know your idea</p>
                    <Form onSubmit={handleSubmit} className="whitelist_form">
                        <TextField
                            label="Name of the product"
                            placeholder="T-Shot Fox"
                            name="filed_1"
                            inputProps={{ ...register('filed_1', { required: true }) }}
                            error={formErrors && formErrors['filed_1']}
                        />
                        <TextField
                            label="Material"
                            placeholder="Polyester"
                            name="filed_2"
                            inputProps={{ ...register('filed_2', { required: true }) }}
                            error={formErrors && formErrors['filed_2']}
                        />

                        <div className="create__item">
                            <Controller
                                control={control}
                                name="filed_3"
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="select"
                                        error={formErrors && formErrors['filed_3']}
                                        select
                                        selectOptions={[
                                            { value: 'placeholder', name: 'Choose the size' },
                                            ...SIZE_LIST,
                                        ]}
                                    />
                                )}
                            />
                        </div>
                        <TextField
                            label="Color"
                            placeholder="<color of NFT>"
                            name="filed_4"
                            inputProps={{ ...register('filed_4', { required: true }) }}
                            error={formErrors && formErrors['filed_4']}
                        />
                        <TextField
                            label="Country of origin (Made in)"
                            placeholder="e.g. Made in USA"
                            name="filed_5"
                            inputProps={{ ...register('filed_5', { required: true }) }}
                            error={formErrors && formErrors['filed_5']}
                        />
                        <TextField
                            label="Place of purchase"
                            placeholder="www.checkbrand.com"
                            name="filed_6"
                            inputProps={{ ...register('filed_6', { required: true }) }}
                            error={formErrors && formErrors['filed_6']}
                        />
                        <TextField
                            label="Date of purchase"
                            placeholder="<mint date>"
                            name="filed_7"
                            inputProps={{ ...register('filed_7', { required: true }) }}
                            error={formErrors && formErrors['filed_7']}
                        />
                        <TextField
                            label="Price"
                            placeholder="<NFT price>"
                            name="filed_8"
                            inputProps={{ ...register('filed_8', { required: true }) }}
                            error={formErrors && formErrors['filed_8']}
                        />
                        <TextField
                            label="Unique number (if any)"
                            placeholder="<unique card nr>"
                            name="filed_9"
                            inputProps={{ ...register('filed_9', { required: true }) }}
                            error={formErrors && formErrors['filed_9']}
                        />
                        <TextField
                            label="URL link to a picture"
                            placeholder="e.g. https://dropbox.com/..."
                            name="filed_10"
                            inputProps={{ ...register('filed_10', { required: true }) }}
                            error={formErrors && formErrors['filed_10']}
                        />
                        <TextField
                            label="Describe story of the bottle"
                            placeholder="e.g. I had a friend that I had not seen for 5 years come to visit me. To celebrate I got a bottle of Jack, which I had been saving for a special occasion. We drank and my friend told me many interesting stories that had happened to him. It was a wonderful memory..."
                            name="description"
                            multiline
                            inputProps={{ ...register('description', { required: true }) }}
                            error={formErrors && formErrors['description']}
                        />

                        <div className="create__item">
                            <p className="create__item--title">
                                Attention! The information above will be uploaded to the NFT
                                metadata.
                            </p>
                        </div>
                        <TextField
                            label="Specify data for feedback"
                            placeholder="Email"
                            name="email"
                            inputProps={{ ...register('email', { required: true }) }}
                            error={formErrors && formErrors['email']}
                        />
                        <TextField
                            label="Discord name"
                            placeholder="Discord name"
                            name="discord_name"
                            inputProps={{ ...register('discord_name', { required: true }) }}
                            error={formErrors && formErrors['discord_name']}
                        />

                        <div className="modal__buttons">
                            {isLoading ? (
                                <button className="button button__default" disabled>
                                    Loading...
                                </button>
                            ) : (
                                <button type="submit" className="button button__default">
                                    Start Checking
                                </button>
                            )}
                        </div>
                    </Form>

                    <div className="modal__info">
                        <div className="modal__info--block">
                            After confirmation, the information will be sent to the moderator for
                            verification. If verified successfully, you will receive an email with
                            further instructions. Whitelist cannot be sold or transferred to another
                            person. It will be attached to your wallet. Only you will be able to
                            mint NFT of this collection. After confirmation, the information will be
                            sent to the moderator for verification. If verified successfully, you
                            will receive an email with further instructions. Whitelist cannot be
                            sold or transferred to another person. It will be attached to your
                            wallet. Only you will be able to mint NFT of this collection.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(NrcModal);
