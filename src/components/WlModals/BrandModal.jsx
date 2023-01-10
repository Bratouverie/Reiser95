import React from 'react';
import Joi from '@hapi/joi';
import { useForm } from 'react-hook-form';
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

const BrandModal = (props) => {
    const { onClose, onSubmit, whiteListApplicationData, isLoading } = props;

    const { validationResolver } = useValidationResolver(schema);

    const {
        register,
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
                    <p className="blue">Reebok NFT Certificates</p>

                    <p className="create__item--text">
                        To get on Whitelist let us know the information about your item
                    </p>
                    <Form onSubmit={handleSubmit} className="whitelist_form">
                        <TextField
                            label="Enter name of the product"
                            placeholder="e.g. Shaq Attaq Basketball Shoes"
                            name="filed_1"
                            inputProps={{ ...register('filed_1', { required: true }) }}
                            error={formErrors && formErrors['filed_1']}
                        />
                        <TextField
                            label="Material"
                            placeholder="e.g. Eco-leather"
                            name="filed_2"
                            inputProps={{ ...register('filed_2', { required: true }) }}
                            error={formErrors && formErrors['filed_2']}
                        />
                        <TextField
                            label="The size"
                            placeholder="e.g. Size 10.5"
                            name="filed_3"
                            inputProps={{ ...register('filed_3', { required: true }) }}
                            error={formErrors && formErrors['filed_3']}
                        />
                        <TextField
                            label="Color"
                            placeholder="e.g. Color Black"
                            name="filed_4"
                            inputProps={{ ...register('filed_4', { required: true }) }}
                            error={formErrors && formErrors['filed_4']}
                        />
                        <TextField
                            label="Country of origin (Made in)"
                            placeholder="e.g. Made in Indonesia"
                            name="filed_5"
                            inputProps={{ ...register('filed_5', { required: true }) }}
                            error={formErrors && formErrors['filed_5']}
                        />
                        <TextField
                            label="Place of purchase (shop adress: country, city, street, office)"
                            placeholder="e.g. Newark Avenue 160, Jersey, USA"
                            name="filed_6"
                            inputProps={{ ...register('filed_6', { required: true }) }}
                            error={formErrors && formErrors['filed_6']}
                        />
                        <TextField
                            label="Date of purchase"
                            placeholder="e.g. Okt 29, 2022"
                            name="filed_7"
                            inputProps={{ ...register('filed_7', { required: true }) }}
                            error={formErrors && formErrors['filed_7']}
                        />
                        <TextField
                            label="Price"
                            placeholder="e.g. Price 180$"
                            name="filed_8"
                            inputProps={{ ...register('filed_8', { required: true }) }}
                            error={formErrors && formErrors['filed_8']}
                        />
                        <TextField
                            label="Unique number (if any)"
                            placeholder="e.g. Item no. P00584395"
                            name="filed_9"
                            inputProps={{ ...register('filed_9', { required: true }) }}
                            error={formErrors && formErrors['filed_9']}
                        />
                        <TextField
                            label="URL link to a picture of your item"
                            placeholder="e.g. https://dropbox.com/..."
                            name="filed_10"
                            inputProps={{ ...register('filed_10', { required: true }) }}
                            error={formErrors && formErrors['filed_10']}
                        />
                        <TextField
                            label="Describe story about your branded item"
                            placeholder="e.g. In these sneakers I won the basketball World Cup, the Universe Cup and all the Galaxy Cups of the world. Very pleasant memories..."
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

export default React.memo(BrandModal);
