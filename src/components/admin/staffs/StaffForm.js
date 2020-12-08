import { Grid } from "@material-ui/core"
import { Controls } from "../../controls/Controls"

export default function StaffForm({
  values, errors, handleInputChange, handleSubmit
}) {

  return (
    <Grid container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Controls.CustomInput
          label='Username'
          name='username'
          autoFocus
          value={values.username}
          onChange={handleInputChange}
          error={errors.username}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
        <Controls.CustomInput
          label='Password'
          name='password'
          type='password'
          value={values.password}
          onChange={handleInputChange}
          error={errors.password}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
        <Controls.CustomInput
          label='Fullname'
          name='fullname'
          value={values.fullname}
          onChange={handleInputChange}
          error={errors.fullname}
          onKeyDown={(e) => {
            if (e.code === 'Enter') handleSubmit(e)
          }}
        />
        <Controls.CustomSelect
          label='Position'
          name='position'
          value={values.position}
          error={errors.position}
          onChange={handleInputChange}
        />
      </div>
    </Grid>
  )
}
