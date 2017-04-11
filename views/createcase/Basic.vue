<template>
  <div>
    <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <h1 class="title">Formulario Para la Creacion de Casos</h1>
        <div class="block">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Titulo</label>
            </div>
            <div class="control is-grouped">
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="Titulo">
              </p>
              <p class="control is-expanded">
                <input class="input" type="text" placeholder="¿Quien lo Solicita?">
              </p>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Tipo de Caso</label>
            </div>
            <div class="control">
              <div class="select is-fullwidth">
                <select>
                  <option value="CONSULTORIA">Analítico</option>
                  <option value="SOPORTE">Básico</option>
                  <option value="DATOBOX">Datobox</option>
                  <option value="PROGRAMACION">Desarrollo</option>
                  <option value="WEB">Pendiente de Asignar</option>
                  <option value="PRODUCTO">Producto / Funcionalidades Nuevas / Oppen 2</option>
                </select>
              </div>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">Descripción</label>
            </div>
            <div class="control">
              <textarea class="textarea" placeholder="Explica en que te podemos ayudar"></textarea>
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label"></label>
            </div>
            <div class="control">
              <button class="button is-primary">Submit</button>
              <button class="button is-link">Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
    </div>
  </div>
</template>

<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
