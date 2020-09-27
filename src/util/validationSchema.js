export const validateForm = (value, configs) => {
   let message = null
   let isValid = true
   if (configs.required && isValid) {
      if (value && value instanceof String) {
         isValid = value.trim() !== ''
      } else {
         isValid = value ? true : false
      }
      message = !isValid && configs.required.message
   }

   if (configs.imgType && isValid) {
      let fileTypeRegex = /(jpg|jpeg|png)$/i
      isValid = fileTypeRegex.test(value.type.split('/')[1])
      message = !isValid && configs.imgType.message
   }

   if (configs.requiredCoords && isValid) {
      isValid = value.coords !== null ? true : false
      message = !isValid && configs.requiredCoords.message
   }

   if (configs.minLength && isValid) {
      isValid = value.length >= configs.minLength.value
      message = !isValid && configs.minLength.message
   }

   if (configs.maxLength && isValid) {
      isValid = value.length <= configs.maxLength.value
      message = !isValid && configs.maxLength.message
   }

   if (configs.email && isValid) {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      isValid = emailRegex.test(value)
      message = !isValid && configs.email.message
   }

   if (configs.match && isValid) {
      isValid = value.trim() === configs.match.value.trim()
      message = !isValid && configs.match.message
   }

   return {isValid, message}
}
