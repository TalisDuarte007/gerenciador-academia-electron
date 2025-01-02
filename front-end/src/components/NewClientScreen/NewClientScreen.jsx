import React, { useState } from "react";
import ClientForm from "../ClientForm/ClientForm.jsx";
import { saveClient } from "../../services/dbService.js";

const NewClientScreen = ({ goBack }) => {
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
    plan_frequency: "",
    plan_start_date: getCurrentDate(),
    plan_end_date: "",
    plan_status: "Ativo",
    max_weekly_entries: 0,
	weekly_entries:"0",
    photo: "",
    created_at: getCurrentDate(),
  });

  const handlePlanTypeChange = (e) => {
    const newPlanType = e.target.value;
    let monthsToAdd = 0;
    let daysToAdd = 0;

    if (newPlanType === "mensal") monthsToAdd = 1;
    if (newPlanType === "semestral") monthsToAdd = 6;
    if (newPlanType === "diaria") daysToAdd = 1;
    if (newPlanType === "semanal") daysToAdd = 7;
    if (newPlanType === "quinzenal") daysToAdd = 15;

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

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        const result = await saveClient(formData);
        console.log("Cliente salvo com sucesso:", result);
        goBack();
    } catch (error) {
        console.error("Erro ao salvar cliente:", error);
        alert("Erro ao salvar cliente. Por favor, tente novamente.");
    }

    // console.log("Cliente salvo!");
    // console.log(formData);
    // goBack();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Adicionar Novo Cliente</h2>
      <ClientForm
        formData={formData}
        handleChange={handleChange}
        handlePlanTypeChange={handlePlanTypeChange}
        handleSave={handleSave}
        areFieldsValid={areFieldsValid}
        goBack={goBack}
      />
    </div>
  );
};

export default NewClientScreen;
