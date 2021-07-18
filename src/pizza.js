import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from 'axios';

let schema = yup.object().shape({
    name: yup.string().required("name must be at least 2 characters").min(2, "name must be at least 2 characters"),
    size: yup
      .string()
      .oneOf(["Small", "Medium", "Large", "XL"], "Please select a size"),
    pepperoni: yup.boolean(),
    salami: yup.boolean(),
    peppers: yup.boolean(),
    mushrooms: yup.boolean(),
    tomato: yup.boolean(),
    olive: yup.boolean(),
    specialText: yup.string()
  });
  
  export default function Pizza() {
    const [form, setForm] = useState({
      name: "",
      size: "",
      pepperoni: false,
      salami: false,
      peppers: false,
      mushrooms: false,
      tomato: false,
      olive: false,
      specialText: ""
    });
    const [errors, setErrors] = useState({
      name: "",
      size: "",
      pepperoni: false,
      salami: false,
      peppers: false,
      mushrooms: false,
      tomato: false,
      olive: false,
      specialText: ""
    });
    const [disabled, setDisabled] = useState(true);
  
    const setFormErrors = (name, value) => {
      yup
        .reach(schema, name)
        .validate(value)
        .then(() => setErrors({ ...errors, [name]: "" }))
        .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
    };
  
    const handleChange = (event) => {
      const { name, type, value, checked } = event.target;
      const valueToUse = type === "checkbox" ? checked : value;
      setFormErrors(name, valueToUse);
      setForm({ ...form, [name]: valueToUse });
      console.log("changing");
    };
  
    const submit = (event) => {
      event.preventDefault();
      const newPizza = {
        name: form.name.trim(),
        size: form.size,
        pepperoni: form.pepperoni,
        salami: form.salami,
        peppers: form.peppers,
        mushrooms: form.mushrooms,
        tomato: form.tomato,
        olive: form.olive,
        specialText: form.specialText
      };
      axios
        .post("https://reqres.in/api/orders", newPizza)
        .then((res) => {
          setForm({ name: "", size: "", pepperoni: false, salami: false, peppers: false, mushrooms: false, tomato: false, olive: false, specialText: "" });
        })
        .catch((err) => {
          debugger;
        });
    };
  
    useEffect(() => {
      schema.isValid(form).then((valid) => setDisabled(!valid));
    }, [form]);
  
    return (
      <div id="pizza-form">
        <form onSubmit={submit}>
          <label id="name-input">
            Name:
            <input
              value={form.name}
              name="name"
              type="text"
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.name}</div>
          </div>
          <label id="size-dropdown">
            Size:
            <select value={form.state} name="size" onChange={handleChange}>
              <option value="">--select a size--</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="XL">XL</option>
            </select>
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.size}</div>
          </div>
          <div className="toppings">
            <label>
                Pepperoni:
                <input
                name="pepperoni"
                type="checkbox"
                checked={form.pepperoni}
                onChange={handleChange}
                />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.pepperoni}</div>
            </div>
            <label>
                Salami:
                <input
                name="salami"
                type="checkbox"
                checked={form.salami}
                onChange={handleChange}
                />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.salami}</div>
            </div>
            <label>
                Peppers:
                <input
                name="peppers"
                type="checkbox"
                checked={form.peppers}
                onChange={handleChange}
                />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.peppers}</div>
            </div>
            <label>
                Mushrooms:
                <input
                name="mushrooms"
                type="checkbox"
                checked={form.mushrooms}
                onChange={handleChange}
                />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.mushrooms}</div>
            </div>
            <label>
                Tomatoes:
                <input
                name="tomato"
                type="checkbox"
                checked={form.tomato}
                onChange={handleChange}
                />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.tomato}</div>
            </div>
            <label>
                Olives:
                <input
                name="olive"
                type="checkbox"
                checked={form.olive}
                onChange={handleChange}
                />
            </label>
            <div style={{ color: "red" }}>
                <div>{errors.olive}</div>
            </div>
        </div>
        <label id="special-text">
            Special Instructions:
            <input
              value={form.specialText}
              name="specialText"
              type="text"
              onChange={handleChange}
            />
          </label>
          <div style={{ color: "red" }}>
            <div>{errors.specialText}</div>
          </div>
          <div name="order-button" id="order-button">
            <button disabled={disabled}>Add to Order</button>
          </div>
        </form>
      </div>
    );
  }




