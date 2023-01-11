// @ts-expect-error TS(2552): Cannot find name 'module'. Did you mean 'mode'?
module.exports = (sequelize: any, {
  ARRAY,
  STRING
}: any) => {
  const Contacts = sequelize.define('Contacts', {
    vk: STRING,
    fb: STRING,
    tg: STRING,
    inst: STRING,
    google: STRING,
    tw: STRING,
    phone: STRING,
    address: STRING,
    openHours: {
      type: ARRAY(STRING),
      defaultValue: []
    }
  })

  return Contacts
}
