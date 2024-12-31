import React from "react";

const ClientForm = ({ formData, handleChange, handlePlanTypeChange, handleSave, areFieldsValid, goBack }) => (
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
);

export default ClientForm;

