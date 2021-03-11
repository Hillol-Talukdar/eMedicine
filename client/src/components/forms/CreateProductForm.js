import React from "react";

const CreateProductForm = ({
    submitHandler,
    changeHandler,
    values,
    btnName,
    btnIcon,
}) => {
    //destructure
    const {
        title,
        description,
        price,
        categories,
        category,
        subCategory,
        shipping,
        quantity,
        images,
        brands,
        brand,
    } = values;

    return (
        <form
            class="d-flex align-items-center flex-column"
            onSubmit={submitHandler}
        >
            <input
                type="text"
                name="title"
                class="form-control text-center w-50"
                placeholder="Title"
                value={title}
                onChange={changeHandler}
                required
                autoFocus
            />
            <input
                type="text"
                name="description"
                class="form-control text-center w-50"
                placeholder="Description"
                value={description}
                required
                onChange={changeHandler}
            />
            <input
                type="number"
                name="price"
                class="form-control text-center w-50"
                placeholder="Product Price"
                value={price}
                required
                onChange={changeHandler}
            />
            <select
                name="shipping"
                className="form-control m-auto w-50 mb-3"
                onChange={changeHandler}
            >
                <option>Select shipping</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <input
                type="number"
                name="quantity"
                class="form-control text-center w-50"
                placeholder="Quantity"
                value={quantity}
                required
                onChange={changeHandler}
            />
            <select
                name="brand"
                className="form-control m-auto w-50 mb-3"
                onChange={changeHandler}
            >
                <option>Select Category</option>
                {brands.map((brnd) => (
                    <option key={brnd} value={brnd}>
                        {brnd}
                    </option>
                ))}
            </select>

            <div
                class="mx-auto mt-3"
                data-toggle="tooltip"
                data-placement="top"
                title="Name which contains atleast 1 character will enable this button"
            >
                <button class="btn btn-primary" type="submit">
                    {btnName}&nbsp;&nbsp;{btnIcon}
                </button>
            </div>
        </form>
    );
};

export default CreateProductForm;
