import React, { useState } from "react";

const NewClientScreen = ({ goBack }) => {
  const handleSave = (e) => {
    e.preventDefault();
    console.log("Cliente salvo!");
    console.log(formData);
    //goBack(); // Voltar à tela principal após salvar
  };

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const addMonthsToDate = (dateString, monthsToAdd) => {
    const [day, month, year] = dateString.split("-").map(Number);
    const startDate = new Date(year, month - 1, day);
    startDate.setMonth(startDate.getMonth() + monthsToAdd);
    const endDay = String(startDate.getDate()).padStart(2, "0");
    const endMonth = String(startDate.getMonth() + 1).padStart(2, "0");
    const endYear = startDate.getFullYear();
    return `${endDay}-${endMonth}-${endYear}`;
  };

  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    contact: "",
    address: "",
    email: "",
    plan_type: "",
    plan_frequency: "", // 3x por semana ou Livre
    plan_start_date: getCurrentDate(),
    plan_end_date: "",
    plan_status: "Ativo",
    max_weekly_entries: 0,
    photo: "",
    created_at: getCurrentDate(),
  });

  const handlePlanTypeChange = (e) => {
    const newPlanType = e.target.value;
    let monthsToAdd = 0;
    let daysToAdd = 0;

    if (newPlanType === "mensal") {
      monthsToAdd = 1;
    } else if (newPlanType === "semestral") {
      monthsToAdd = 6;
    } else if (newPlanType === "diaria") {
      daysToAdd = 1;
    } else if (newPlanType === "semanal") {
      daysToAdd = 7;
    } else if (newPlanType === "quinzenal") {
      daysToAdd = 15;
    }

    let newEndDate = formData.plan_start_date;

    if (monthsToAdd > 0) {
      newEndDate = addMonthsToDate(formData.plan_start_date, monthsToAdd);
    } else if (daysToAdd > 0) {
      const [day, month, year] = formData.plan_start_date.split("-").map(Number);
      const startDate = new Date(year, month - 1, day);
      startDate.setDate(startDate.getDate() + daysToAdd);
      const endDay = String(startDate.getDate()).padStart(2, "0");
      const endMonth = String(startDate.getMonth() + 1).padStart(2, "0");
      const endYear = startDate.getFullYear();
      newEndDate = `${endDay}-${endMonth}-${endYear}`;
    }

    setFormData((prev) => ({
      ...prev,
      plan_type: newPlanType,
      plan_end_date: newEndDate,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const areFieldsValid = () => {
    const { name, age, contact, address, email, plan_type, plan_start_date } = formData;

    return (
      name.trim() !== "" &&
      age > 0 &&
      contact.trim() !== "" &&
      address.trim() !== "" &&
      email.trim() !== "" &&
      plan_type.trim() !== "" &&
      plan_start_date.trim() !== ""
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Adicionar Novo Cliente</h2>
      <form
        onSubmit={handleSave}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Nome"
          required
        />
        <input
          name="age"
          value={formData.age}
          onChange={handleChange}
          type="text"
          placeholder="Idade"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="E-mail"
          required
        />
        <input
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          type="tel"
          placeholder="Telefone"
          required
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          type="text"
          placeholder="Endereço"
          required
        />
        <select name="plan_type" value={formData.plan_type} onChange={handlePlanTypeChange}>
          <option value="">Selecione o Tipo de Plano</option>
          <option value="mensal">Mensal</option>
          <option value="semestral">Semestral</option>
          <option value="diaria">Diária</option>
          <option value="semanal">Semanal</option>
          <option value="quinzenal">Quinzenal</option>
        </select>

        {["mensal", "semestral"].includes(formData.plan_type) && (
          <div>
            <p>Frequência do Plano:</p>
            <label>
              <input
                type="radio"
                name="plan_frequency"
                value="3x por semana"
                checked={formData.plan_frequency === "3x por semana"}
                onChange={handleChange}
              />
              3x por semana
            </label>
            <label>
              <input
                type="radio"
                name="plan_frequency"
                value="Livre"
                checked={formData.plan_frequency === "Livre"}
                onChange={handleChange}
              />
              Livre
            </label>
          </div>
        )}

        <button type="submit" disabled={!areFieldsValid()}>
          Salvar
        </button>
        <button type="button" onClick={goBack}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default NewClientScreen;
