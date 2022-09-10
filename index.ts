// Roles
export const homeowner = 'homeowner'
export const serviceProvider = 'serviceprovider'

// Json-Object
export function toJson<T>(object: T): string {
  console.log('*** toJson object: ', object)
  return JSON.stringify(object)
}

export function toObject<T>(json: string): T {
  console.log('*** toObject json: ', json)
  return JSON.parse(json)
}

// Commands
export class Register {
  constructor(public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string) {}
}

export class Login {
  constructor(public emailAddress: string, 
              public pin: string) {}
}

export class SaveWorkOrder {
  constructor(public workOrder: WorkOrder) {}
}

export class SaveUser {
  constructor(public user: User) {}
}

// Events
export class Registered {
  constructor(public pin: string,
              public success: boolean = true,
              public error: string = '') {}

  static success(pin: string): Registered {
    return new Registered(pin)
  }
  
  static fail(error: string): Registered {
    return new Registered('', false, error)
  }
}

export class LoggedIn {
  constructor(public user: User, 
              public serviceProviders: User[], 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]): LoggedIn {
    return new LoggedIn(user, serviceProviders, workOrders)  
  }

  static fail(error: string): LoggedIn {
    return new LoggedIn(User.empty(), [], [], false, error)
  }
}

export class WorkOrderSaved {
  constructor(public number: number,
              public success: boolean = true,
              public error: string = '') {}

  static success(number: number): WorkOrderSaved {
    return new WorkOrderSaved(number)
  }
  
  static fail(number: number, error: string): WorkOrderSaved {
    return new WorkOrderSaved(number, false, error)
  }
}

export class WorkOrderSelected {
  constructor(public number: number,
              public workOrder: WorkOrder, 
              public success: boolean = true, 
              public error: string = '') {}

  static success(workOrder: WorkOrder): WorkOrderSelected {
    return new WorkOrderSelected(workOrder.number, workOrder)
  }

  static fail(number: number, error: string): WorkOrderSelected {
    return new WorkOrderSelected(number, WorkOrder.empty(), false, error)
  }
}

export class WorkOrdersListed {
  constructor(public userId: number, 
              public workOrders: WorkOrder[], 
              public success: boolean = true, 
              public error: string = '') {}

  static success(userId: number, workOrders: WorkOrder[]): WorkOrdersListed {
    return new WorkOrdersListed(userId, workOrders)
  }

  static fail(userId: number, error: string): WorkOrdersListed {
    return new WorkOrdersListed(userId, [WorkOrder.empty()], false, error)
  }
}

export class UserSaved {
  constructor(public id: number, 
              public success: boolean = true, 
              public error: string = '') {}

  static success(id: number): UserSaved {
    return new UserSaved(id)
  }

  static fail(id: number, error: string): UserSaved {
    return new UserSaved(id, false, error)
  }
}

// Entities
export class WorkOrder {
  constructor(public number: number,
              public homeownerId: number, 
              public serviceProviderId: number, 
              public title: string, 
              public issue: string, 
              public imageUrl: string, 
              public resolution: string, 
              public opened: string, 
              public closed: string) {}

  static empty(): WorkOrder {
    return new WorkOrder(0, 0, 0, '', '', '', '', '', '')
  }
}

export class User {
  constructor(public id: number, 
              public role: string, 
              public name: string, 
              public emailAddress: string, 
              public streetAddress: string, 
              public registered: string, 
              public pin: string,
              public license: string) {}

  static empty(): User {
    return new User(0, '', '', '', '', '', '', '')
  }
}

// Validators
const roleInvalidMessage = 'A valid role must be selected.'
const nameInvalidMessage = 'For name, enter at least 2 characters.'
const emailAddressInvalidMessage = 'For email address, enter at least 3 characters to inlcude @.'
const streetAddressInvalidMessage = 'For street address, enter at least 6 characters.'
const pinInvalidMessage = 'For pin, enter exactly 7 numbers, characters and/or symbols.'
const datetimeInvalidMessage = 'For datetime, must use 24-character ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ'
const idInvalidMessage = 'An id must be greater than 0.'
const numberInvalidMessage = 'A number must be greater than 0.'
const definedInvalidMessage = 'This field may be empty, but must be defined.'

function isDefined(string: string): boolean {
  let isDefined
  try {
    isDefined = string !== undefined && string !== null && string.length >= 0
  } catch {
    isDefined = false
  }
  return isDefined
}

function isRole(role: string): boolean {
  return isDefined(role) ? role === homeowner || role === serviceProvider : false
}

function isEmailAddress(emailAddress: string): boolean {
  return isDefined(emailAddress) ? idLengthRange(emailAddress, 3, 128) && emailAddress.includes('@') : false
}

function isLength(string: string, length: number): boolean {
  return isDefined(string) ? string.length === length : false
}

function idLengthRange(string: string, lower: number, upper: number): boolean {
  return isDefined(string) ? string.length >= lower && string.length <= upper : false
}

function isGreaterThanOrEqualZero(number: number): boolean {
  return number >= 0
}

export function isGreaterThanZero(number: number): boolean {
  return number > 0
}

export function isImageUrl(url: string): boolean {
  return isDefined(url) ? url.startsWith('/images/') : false
}

export function isRegisterValid(register: Register): boolean {
  return validateRegisterForm(register.role, register.name, register.emailAddress, register.streetAddress).length === 0
}

export function isLoginValid(login: Login): boolean {
  return validateLoginForm(login.emailAddress, login.pin).length === 0
}

export function isWorkOrderValid(workOrder: WorkOrder): boolean {
  return validateWorkOrder(workOrder.number, workOrder.homeownerId, workOrder.serviceProviderId, workOrder.title,
     workOrder.issue, workOrder.imageUrl, workOrder.resolution, workOrder.opened, workOrder.closed).length === 0
}

export function isUserValid(user: User): boolean {
  return validateUser(user.id, user.role, user.name, user.emailAddress, user.streetAddress, user.registered, user.pin).length === 0
}

export function validateRegisterForm(role: string, name: string, emailAddress: string, streetAddress: string): string[] {
  const errors = []
  if (!isRole(role)) errors.push(roleInvalidMessage)
  if (!idLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!isEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!idLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}

export function validateLoginForm(emailAddress: string, pin: string): string[] {
  const errors = []
  if (!isEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!isLength(pin, 7)) errors.push(pinInvalidMessage)
  return errors
}

export function validateUserForm(name: string, emailAddress: string, streetAddress: string): string[] {
  const errors = []
  if (!idLengthRange(name, 2, 64)) errors.push(nameInvalidMessage)
  if (!isEmailAddress(emailAddress)) errors.push(emailAddressInvalidMessage)
  if (!idLengthRange(streetAddress, 6, 128)) errors.push(streetAddressInvalidMessage)
  return errors
}

export function validateWorkOrder(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string): string[] {
  const errors = []
  if (!isGreaterThanOrEqualZero(number)) errors.push(numberInvalidMessage)
  if (!isGreaterThanZero(homeownerId)) errors.push(idInvalidMessage)
  if (!isGreaterThanZero(serviceProviderId)) errors.push(idInvalidMessage)
  if (!idLengthRange(title, 4, 64)) errors.push(definedInvalidMessage)
  if (!idLengthRange(issue, 4, 255)) errors.push(definedInvalidMessage)
  if (!isDefined(imageUrl)) errors.push(definedInvalidMessage)
  if (!isDefined(resolution)) errors.push(definedInvalidMessage)
  if (!isLength(opened, 24)) errors.push(datetimeInvalidMessage)
  if (!isDefined(closed)) errors.push(definedInvalidMessage)
  return errors
}

export function validateUser(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string, pin: string): string[] {
  const errors = []
  if (!isGreaterThanZero(id)) errors.push(idInvalidMessage)
  if (!isLength(registered, 24)) errors.push(datetimeInvalidMessage)
  errors.concat( validateRegisterForm(role, name, emailAddress, streetAddress) )
  if (!isLength(pin, 7)) errors.push(pinInvalidMessage)
  return errors
}