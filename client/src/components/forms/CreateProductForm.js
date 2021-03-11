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
                class="form-control m-auto mb-3"
                placeholder="Title"
                value={title}
                onChange={changeHandler}
                required
                autoFocus
            />
            <input
                type="text"
                name="description"
                class="form-control m-auto mb-3"
                placeholder="Description"
                value={description}
                required
                onChange={changeHandler}
            />
            <input
                type="number"
                name="price"
                class="form-control m-auto mb-3"
                placeholder="Product Price"
                value={price}
                required
                onChange={changeHandler}
            />
            <select
                name="shipping"
                className="form-control m-auto mb-3"
                onChange={changeHandler}
            >
                <option>Select shipping</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
            <input
                type="number"
                name="quantity"
                class="form-control m-auto mb-3"
                placeholder="Quantity"
                value={quantity}
                required
                onChange={changeHandler}
            />
            <select
                name="brand"
                className="form-control m-auto mb-3"
                onChange={changeHandler}
            >
                <option>Select Brand</option>
                {brands.map((brnd) => (
                    <option key={brnd} value={brnd}>
                        {brnd}
                    </option>
                ))}
            </select>

            <select
                name="category"
                className="form-control m-auto mb-3"
                onChange={changeHandler}
            >
                <option>Select Category</option>
                {categories.length > 0 &&
                    categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                            {cat.name}
                        </option>
                    ))}
            </select>

            <div
                class="mx-auto mt-3 d-grid gap-2 col-5"
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
