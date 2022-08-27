import React from 'react';

import './index.css';

const CreatePage = () => {
    return(
        <div className="default__padding createpage">
            <div className="container">
                <div className="createpage__inner">
                    <h2 className="title left">
                        Create Page
                    </h2>

                    <p className="text left">
                        The created Page will be available for management in the Control Panel.
                    </p>

                    <div className="create__content">
                        <div className="create__item half">
                            <p className="create__item--title required">
                                Page name
                            </p>

                            <input type="text" className="input create__item--input" placeholder="Enter Page name" />
                        </div>

                        <div className="create__item half">
                            <p className="create__item--title required">
                                Page number
                            </p>

                            <input type="text" className="input create__item--input" placeholder="1" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title">
                                URL
                            </p>

                            <p className="create__item--text">
                                Customize your URL on CheckBrandcom. Must only contain lowercase letters, numbers, and hyphens.
                            </p>

                            <input type="text" className="input create__item--input" placeholder="https://checkbrand.com/" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Banner image
                            </p>

                            <p className="create__item--text">
                                This image will appear at the top of account page. 1400 x 400 recommended.
                            </p>

                            <input id="createpageBanner" type="file" className="file" accept="image/png, image/gif, image/jpeg" />

                            <label htmlFor="createpageBanner" className="create__item--label banner">
                                <img src="/assets/img/img.png" alt="img" className="create__item--label--img" />
                            </label>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Title 1
                            </p>

                            <input type="text" className="input create__item--input" placeholder="Enter Title name" />
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Description
                            </p>

                            <p className="create__item--text">
                                Markdown syntax is supported. 0 of 1000 characters used.
                            </p>

                            <textarea type="text" className="input create__item--textarea" placeholder="Enter Page description"></textarea>
                        </div>

                        <div className="create__item">
                            <p className="create__item--title required">
                                Title 2
                            </p>

                            <input type="text" className="input create__item--input" placeholder="Enter Title name" />
                        </div>
                    </div>

                    <div className="create__button--content">
                        <button className="button create__button default__hover">
                            Create
                        </button>

                        <button className="button create__button default__hover">
                            Submit changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage;