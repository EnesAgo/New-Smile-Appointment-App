export interface IInpLgPropsInterface{
    placeholderVal: string,
    inpType: string,
    inpRef: any,
    hasPic: boolean,
    imgSrc?: string,
    imgAlt?: string,
    className?: string
}

export interface IPatientEditDataInterface{
    patientData: {
        name: string,
        surname: string,
        parentName: string,
        addres: string,
        email: string,
        tel: string,
        birthDate: string,
        birthPlace: string,
        debt: number,
        debtCurrencyType: string,
        status: boolean,
        EMBG: string,
        img: string
    }
}

export interface IPatientEventInterface {
    patientHistoryData: {
        title: string,
        start: string,
        end: string,
        description: string,
        from: string,
        patient: string,
        bill: string,
        color: string,
        uuID: string
    }[]
}