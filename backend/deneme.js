const keys = ["medicine","allergies","stableHealth","operationInFiveYears","HepatitisDisease","jaundiceDisease","hiv","pregnant","patientUUID"]

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}
keys.forEach(e =>
console.log(`const [${e}Val, set${capitalize(e)}Val] = useState(false);`)
)

