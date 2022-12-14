// Mime Types
const mimetypes = new Map();
mimetypes.set('image/jpeg', 'jpeg');
mimetypes.set('image/jpg', 'jpg');
mimetypes.set('image/png', 'png');
export function isMimeTypeAccepted(mimetype) {
    return mimetypes.has(mimetype);
}
export function getFileExtByMimeType(mimetype) {
    let ext = 'txt';
    if (mimetypes.has(mimetype)) {
        const value = mimetypes.get(mimetype);
        if (value !== undefined)
            ext = value;
    }
    return ext;
}
// Roles
export const homeowner = 'homeowner';
export const serviceProvider = 'serviceprovider';
// Json-Object
export function toJson(object) {
    return JSON.stringify(object);
}
export function toObject(json) {
    return JSON.parse(json);
}
// Commands
export class Register {
    role;
    name;
    emailAddress;
    streetAddress;
    constructor(role, name, emailAddress, streetAddress) {
        this.role = role;
        this.name = name;
        this.emailAddress = emailAddress;
        this.streetAddress = streetAddress;
    }
}
export class Login {
    emailAddress;
    pin;
    constructor(emailAddress, pin) {
        this.emailAddress = emailAddress;
        this.pin = pin;
    }
}
export class SaveWorkOrder {
    workOrder;
    license;
    constructor(workOrder, license) {
        this.workOrder = workOrder;
        this.license = license;
    }
}
export class ListWorkOrders {
    userId;
    license;
    constructor(userId, license) {
        this.userId = userId;
        this.license = license;
    }
}
export class SaveUser {
    user;
    constructor(user) {
        this.user = user;
    }
}
// Events
export class Registered {
    pin;
    success;
    error;
    constructor(pin, success = true, error = '') {
        this.pin = pin;
        this.success = success;
        this.error = error;
    }
    static success(pin) {
        return new Registered(pin);
    }
    static fail(error) {
        return new Registered('', false, error);
    }
}
export class LoggedIn {
    user;
    serviceProviders;
    workOrders;
    success;
    error;
    constructor(user, serviceProviders, workOrders, success = true, error = '') {
        this.user = user;
        this.serviceProviders = serviceProviders;
        this.workOrders = workOrders;
        this.success = success;
        this.error = error;
    }
    static success(user, serviceProviders, workOrders) {
        return new LoggedIn(user, serviceProviders, workOrders);
    }
    static fail(error) {
        return new LoggedIn(User.empty(), [], [], false, error);
    }
}
export class WorkOrderSaved {
    number;
    success;
    error;
    constructor(number, success = true, error = '') {
        this.number = number;
        this.success = success;
        this.error = error;
    }
    static success(number) {
        return new WorkOrderSaved(number);
    }
    static fail(number, error) {
        return new WorkOrderSaved(number, false, error);
    }
}
export class WorkOrdersListed {
    userId;
    workOrders;
    success;
    error;
    constructor(userId, workOrders, success = true, error = '') {
        this.userId = userId;
        this.workOrders = workOrders;
        this.success = success;
        this.error = error;
    }
    static success(userId, workOrders) {
        return new WorkOrdersListed(userId, workOrders);
    }
    static fail(userId, error) {
        return new WorkOrdersListed(userId, [WorkOrder.empty()], false, error);
    }
}
export class UserSaved {
    id;
    success;
    error;
    constructor(id, success = true, error = '') {
        this.id = id;
        this.success = success;
        this.error = error;
    }
    static success(id) {
        return new UserSaved(id);
    }
    static fail(id, error) {
        return new UserSaved(id, false, error);
    }
}
// Entities
export class WorkOrder {
    number;
    homeownerId;
    serviceProviderId;
    title;
    issue;
    streetAddress;
    imageUrl;
    resolution;
    opened;
    closed;
    constructor(number, homeownerId, serviceProviderId, title, issue, streetAddress, imageUrl, resolution, opened, closed) {
        this.number = number;
        this.homeownerId = homeownerId;
        this.serviceProviderId = serviceProviderId;
        this.title = title;
        this.issue = issue;
        this.streetAddress = streetAddress;
        this.imageUrl = imageUrl;
        this.resolution = resolution;
        this.opened = opened;
        this.closed = closed;
    }
    static empty() {
        return new WorkOrder(0, 0, 0, '', '', '', '', '', '', '');
    }
}
export class User {
    id;
    role;
    name;
    emailAddress;
    streetAddress;
    registered;
    pin;
    license;
    constructor(id, role, name, emailAddress, streetAddress, registered, pin, license) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.emailAddress = emailAddress;
        this.streetAddress = streetAddress;
        this.registered = registered;
        this.pin = pin;
        this.license = license;
    }
    static empty() {
        return new User(0, '', '', '', '', '', '', '');
    }
}
// Validators
const licenseInvalidMessage = 'A valid license is 36 characters.';
const roleInvalidMessage = 'A valid role must be selected.';
const nameInvalidMessage = 'For name, enter at least 2 characters.';
const emailAddressInvalidMessage = 'For email address, enter at least 3 characters to inlcude @.';
const streetAddressInvalidMessage = 'For street address, enter at least 6 characters.';
const pinInvalidMessage = 'For pin, enter exactly 7 numbers, characters and/or symbols.';
const datetimeInvalidMessage = 'For datetime, must use 24-character ISO standard: YYYY-MM-DDTHH:mm:ss.sssZ';
const idInvalidMessage = 'An id must be greater than 0.';
const numberInvalidMessage = 'A number must be greater than 0.';
const definedInvalidMessage = 'This field may be empty, but must be defined.';
function isDefined(string) {
    return string !== null;
}
function isRole(role) {
    return isDefined(role) ? role === homeowner || role === serviceProvider : false;
}
function isEmailAddress(emailAddress) {
    return isDefined(emailAddress) ? idLengthRange(emailAddress, 3, 128) && emailAddress.includes('@') : false;
}
function isLength(string, length) {
    return isDefined(string) ? string.length === length : false;
}
function idLengthRange(string, lower, upper) {
    return isDefined(string) ? string.length >= lower && string.length <= upper : false;
}
function isGreaterThanOrEqualZero(number) {
    return number >= 0;
}
export function isLicense(license) {
    return isLength(license, 36);
}
export function isGreaterThanZero(number) {
    return number > 0;
}
export function isImageUrl(url) {
    return isDefined(url) ? url.startsWith('/images/') : false;
}
export function isRegisterValid(register) {
    return validateRegisterForm(register.role, register.name, register.emailAddress, register.streetAddress).length === 0;
}
export function isLoginValid(login) {
    return validateLoginForm(login.emailAddress, login.pin).length === 0;
}
export function isWorkOrderValid(workOrder) {
    return validateWorkOrder(workOrder.number, workOrder.homeownerId, workOrder.serviceProviderId, workOrder.title, workOrder.issue, workOrder.streetAddress, workOrder.imageUrl, workOrder.resolution, workOrder.opened, workOrder.closed).length === 0;
}
export function isUserValid(user) {
    return validateUser(user.id, user.role, user.name, user.emailAddress, user.streetAddress, user.registered, user.pin, user.license).length === 0;
}
export function validateRegisterForm(role, name, emailAddress, streetAddress) {
    const errors = [];
    if (!isRole(role))
        errors.push(roleInvalidMessage);
    if (!idLengthRange(name, 2, 64))
        errors.push(nameInvalidMessage);
    if (!isEmailAddress(emailAddress))
        errors.push(emailAddressInvalidMessage);
    if (!idLengthRange(streetAddress, 6, 128))
        errors.push(streetAddressInvalidMessage);
    return errors;
}
export function validateLoginForm(emailAddress, pin) {
    const errors = [];
    if (!isEmailAddress(emailAddress))
        errors.push(emailAddressInvalidMessage);
    if (!isLength(pin, 7))
        errors.push(pinInvalidMessage);
    return errors;
}
export function validateUserForm(name, emailAddress, streetAddress) {
    const errors = [];
    if (!idLengthRange(name, 2, 64))
        errors.push(nameInvalidMessage);
    if (!isEmailAddress(emailAddress))
        errors.push(emailAddressInvalidMessage);
    if (!idLengthRange(streetAddress, 6, 128))
        errors.push(streetAddressInvalidMessage);
    return errors;
}
export function validateWorkOrder(number, homeownerId, serviceProviderId, title, issue, streetAddress, imageUrl, resolution, opened, closed) {
    const errors = [];
    if (!isGreaterThanOrEqualZero(number))
        errors.push(numberInvalidMessage);
    if (!isGreaterThanZero(homeownerId))
        errors.push(idInvalidMessage);
    if (!isGreaterThanZero(serviceProviderId))
        errors.push(idInvalidMessage);
    if (!idLengthRange(title, 4, 64))
        errors.push(definedInvalidMessage);
    if (!idLengthRange(issue, 4, 255))
        errors.push(definedInvalidMessage);
    if (!idLengthRange(streetAddress, 6, 128))
        errors.push(streetAddressInvalidMessage);
    if (!isDefined(imageUrl))
        errors.push(definedInvalidMessage);
    if (!isDefined(resolution))
        errors.push(definedInvalidMessage);
    if (!isLength(opened, 24))
        errors.push(datetimeInvalidMessage);
    if (!isDefined(closed))
        errors.push(definedInvalidMessage);
    return errors;
}
export function validateUser(id, role, name, emailAddress, streetAddress, registered, pin, license) {
    const errors = [];
    if (!isGreaterThanZero(id))
        errors.push(idInvalidMessage);
    if (!isLength(registered, 24))
        errors.push(datetimeInvalidMessage);
    errors.concat(validateRegisterForm(role, name, emailAddress, streetAddress));
    if (!isLength(pin, 7))
        errors.push(pinInvalidMessage);
    if (!isLength(license, 36))
        errors.push(licenseInvalidMessage);
    return errors;
}
