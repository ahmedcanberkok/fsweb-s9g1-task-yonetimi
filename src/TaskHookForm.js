import React, { useState } from "react";
import { nanoid } from "nanoid";
import {useForm} from "react-hook-form";
import {Input,Form, FormGroup, Label, FormFeedback } from "reactstrap";
import { toast } from "react-toastify";


const TaskHookForm = ({ kisiler, submitFn }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
   } = useForm({
   defaultValues: {
    title: "",
    description: "",
    people: [],
   }
   });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    people: [],
  });



  // task ekleme
  function formSubmit(formData) {
    console.log("formSubmit > formData : ",formData);
    toast.success("Task oluşturuldu.");


    submitFn({
      ...formData,
      id: nanoid(5),
      status: "yapılacak",
    });
    setFormData({
      title: "",
      description: "",
      people: [],
    });
  }


  const  {ref : RefTitle, ...registerTitle} = register ("title", {
    required: "Başlık alanı boş bırakılamaz!",
    minLength: {
      value:3,
      message :"Başlık en az 3 karakter olmalı ",
    }
  }) ;
  const  {ref : RefDes, ...registerDes} = register ("description", {
    required: "Başlık alanı boş bırakılamaz!",
    minLength: {
      value:3,
      message :"Başlık en az 3 karakter olmalı ",
    }
  }) ;

  return (
    <Form className="taskForm" onSubmit={handleSubmit(formSubmit)}>
      <FormGroup className="form-line">
        <Label className="input-label" htmlFor="title">
          Başlık
        </Label>
        <Input
          className="input-text"
          id="title"
          type="text"
         innerRef = {RefTitle}
         {...registerTitle} />

       <p className="input-error">{errors.title && errors.title.message}</p>

        
      </FormGroup>

      <FormGroup className="form-line">
        <Label className="input-label" htmlFor="description">
          Açıklama
        </Label>
        <Input
          className="input-input"
          id="description"
          type ="text"
          innerRef = {RefDes}
          {...registerDes} />
        <FormFeedback className="input-error">{errors.description && errors.description.message}</FormFeedback>
      </FormGroup>

      <FormGroup className="form-line">
  <label className="input-label">İnsanlar</label>
  <FormGroup>
    {kisiler.map((p) => (
      <div key={p}>
        <Label className="input-checkbox">
          <input
            type="checkbox"
            {...register("people", {
              validate: {
                maxSelected: (value) =>
                  value.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                minSelected: (value) =>
                  value.length >= 1 || "Lütfen en az bir kişi seçin",
              },
            })}
            value={p}
            checked={formData.people.includes(p)}
            onChange={(e) => {
              const { checked, value } = e.target;
              if (checked) {
                setFormData((prevData) => ({
                  ...prevData,
                  people: [...prevData.people, value],
                }));
              } else {
                setFormData((prevData) => ({
                  ...prevData,
                  people: prevData.people.filter((person) => person !== value),
                }));
              }
            }}
          />
          {p}
        </Label>
        {errors.people && <p className="input-error">{errors.people.message}</p>}
      </div>
    ))}
  </FormGroup>
</FormGroup>

      <FormGroup className="form-line">
        <button
          className="submit-button"
          type="submit"
          
        >
          Kaydet
        </button>
      </FormGroup>
    </Form>
  );
};

export default TaskHookForm;
