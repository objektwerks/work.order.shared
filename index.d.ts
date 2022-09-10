export declare const homeowner = "homeowner";
export declare const serviceProvider = "serviceprovider";
export declare function toJson<T>(object: T): string;
export declare function toObject<T>(json: string): T;
export declare class Register {
    role: string;
    name: string;
    emailAddress: string;
    streetAddress: string;
    constructor(role: string, name: string, emailAddress: string, streetAddress: string);
}
export declare class Login {
    emailAddress: string;
    pin: string;
    constructor(emailAddress: string, pin: string);
}
export declare class SaveWorkOrder {
    workOrder: WorkOrder;
    constructor(workOrder: WorkOrder);
}
export declare class SaveUser {
    user: User;
    constructor(user: User);
}
export declare class Registered {
    pin: string;
    success: boolean;
    error: string;
    constructor(pin: string, success?: boolean, error?: string);
    static success(pin: string): Registered;
    static fail(error: string): Registered;
}
export declare class LoggedIn {
    user: User;
    serviceProviders: User[];
    workOrders: WorkOrder[];
    success: boolean;
    error: string;
    constructor(user: User, serviceProviders: User[], workOrders: WorkOrder[], success?: boolean, error?: string);
    static success(user: User, serviceProviders: User[], workOrders: WorkOrder[]): LoggedIn;
    static fail(error: string): LoggedIn;
}
export declare class WorkOrderSaved {
    number: number;
    success: boolean;
    error: string;
    constructor(number: number, success?: boolean, error?: string);
    static success(number: number): WorkOrderSaved;
    static fail(number: number, error: string): WorkOrderSaved;
}
export declare class WorkOrderSelected {
    number: number;
    workOrder: WorkOrder;
    success: boolean;
    error: string;
    constructor(number: number, workOrder: WorkOrder, success?: boolean, error?: string);
    static success(workOrder: WorkOrder): WorkOrderSelected;
    static fail(number: number, error: string): WorkOrderSelected;
}
export declare class WorkOrdersListed {
    userId: number;
    workOrders: WorkOrder[];
    success: boolean;
    error: string;
    constructor(userId: number, workOrders: WorkOrder[], success?: boolean, error?: string);
    static success(userId: number, workOrders: WorkOrder[]): WorkOrdersListed;
    static fail(userId: number, error: string): WorkOrdersListed;
}
export declare class UserSaved {
    id: number;
    success: boolean;
    error: string;
    constructor(id: number, success?: boolean, error?: string);
    static success(id: number): UserSaved;
    static fail(id: number, error: string): UserSaved;
}
export declare class WorkOrder {
    number: number;
    homeownerId: number;
    serviceProviderId: number;
    title: string;
    issue: string;
    imageUrl: string;
    resolution: string;
    opened: string;
    closed: string;
    constructor(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string);
    static empty(): WorkOrder;
}
export declare class User {
    id: number;
    role: string;
    name: string;
    emailAddress: string;
    streetAddress: string;
    registered: string;
    pin: string;
    license: string;
    constructor(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string, pin: string, license: string);
    static empty(): User;
}
export declare function isGreaterThanZero(number: number): boolean;
export declare function isImageUrl(url: string): boolean;
export declare function isRegisterValid(register: Register): boolean;
export declare function isLoginValid(login: Login): boolean;
export declare function isWorkOrderValid(workOrder: WorkOrder): boolean;
export declare function isUserValid(user: User): boolean;
export declare function validateRegisterForm(role: string, name: string, emailAddress: string, streetAddress: string): string[];
export declare function validateLoginForm(emailAddress: string, pin: string): string[];
export declare function validateUserForm(name: string, emailAddress: string, streetAddress: string): string[];
export declare function validateWorkOrder(number: number, homeownerId: number, serviceProviderId: number, title: string, issue: string, imageUrl: string, resolution: string, opened: string, closed: string): string[];
export declare function validateUser(id: number, role: string, name: string, emailAddress: string, streetAddress: string, registered: string, pin: string): string[];
