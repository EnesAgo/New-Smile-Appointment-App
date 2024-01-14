export interface InpLgPropsInterface{
    placeholderVal: string,
    inpType: string,
    inpRef: any,
    hasPic: boolean,
    imgSrc?: string,
    imgAlt?: string,
    className?: string
}

export interface PatientEditDataInterface{
    patientData: {
        name: string,
        surname: string,
        parentName: string,
        addres: string,
        email: string,
        tel: string,
        birthDate: string,
        birthPlace: string,
        EMBG: string,
        img: string
    }
}

export interface PatientEventInterface {
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