import SelectSmall from "@/app/components/dropdown";

export default function Admin() {
  return (
    <>
      <form action="">
        <h1>CADASTRO DE ANIMES</h1>
        <fieldset>
          <label htmlFor="name">Nome do Anime:</label>
          <input type="text" name="name" id="name" placeholder="Nome do anime completo..." />
        </fieldset>
        <fieldset>
          <SelectSmall></SelectSmall>
        </fieldset>
      </form>
    </>
  )
}
