import { LightningElement,api,wire } from 'lwc';
import getCertifiedStudents from
'@salesforce/apex/CertifiedStudentList.getCertifiedStudents';
export default class CertifiedStudentlist extends LightningElement {
    
    @api certificationId = 0;
@api certificationName = '';
certifiedStudents;
error;


@wire(getCertifiedStudents, {certificationId:
    '$certificationId'})
    wired_getCertifiedStudents(result) {
        this._wiredStudentResult = result;
        this.certifiedStudents = [];
        if (result.data) {
        this.certifiedStudents = result.data.map(certHeld => ({
        certificationHeldId: certHeld.Id,
        contactId:
        certHeld.Certified_Professional__r.Id,
        name:
        certHeld.Certified_Professional__r.Name,
        date: certHeld.Date_Achieved__c,
        email:
        certHeld.Certified_Professional__r.Email,
        phone:
        certHeld.Certified_Professional__r.Phone
        }));
        } else if (result.error) {
        this.error = result.error;
        }  

    }
        columnConfig = [
            {
            label: 'Name',
            fieldName: 'name',
            type: 'text'
            },
            {
            label: 'Date',
            fieldName: 'date',
            type: 'text'
            },
            {
            label: 'Email',
            fieldName: 'email',
            type: 'email'
            },
            {
            label: 'Phone',
            fieldName: 'phone',
            type: 'phone'
            }
            ];
        

    }
    
