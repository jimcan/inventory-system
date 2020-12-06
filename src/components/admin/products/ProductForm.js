import { Grid } from "@material-ui/core"
import { Controls } from "../../controls/Controls"
import Spacer from "../../controls/Spacer"

export default function ProductForm({
  values, errors, handleInputChange, handleSubmit
}) {

  return (
    <Grid container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Controls.CustomInput
          label='Product Name'
          name='name'
          autoFocus
          value={values.name}
          onChange={handleInputChange}
          error={errors.name}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
        <Controls.CustomInput
          label='Unit'
          name='unit'
          value={values.unit}
          onChange={handleInputChange}
          error={errors.unit}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
      </div>
      <Spacer width='20px' />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Controls.CustomInput
          label='Price'
          name='price'
          value={values.price}
          onChange={handleInputChange}
          error={errors.stock}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
        <Controls.CustomInput
          label='Stock'
          name='stock'
          value={values.stock}
          onChange={handleInputChange}
          error={errors.stock}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
      </div>
    </Grid>
  )
}
