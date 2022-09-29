export class Pointage {

    date = { seconds: 1659550073, nanoseconds: 615000000 };
    datePointage= new Date();
    empreinte = true;
    idvigile = 10;
    latitude = 3.8892994;
    longitude = 11.5380514;
    nomsVigile = "Charlito Probo";

    constructor(data: any) {
        this.init(data);
    }

    init(data: any) {
        if (data.date) {
            this.date = data.date;
            this.datePointage = this.toDate(data.date)
        }
        if (data.empreinte) {
            this.empreinte = data.empreinte;
        }
        if (data.idvigile) {
            this.idvigile = data.idvigile;
        }
        if (data.latitude) {
            this.latitude = data.latitude;
        }
        if (data.longitude) {
            this.longitude = data.longitude;
        }
        if (data.nomsVigile) {
            this.nomsVigile = data.nomsVigile;
        }
    }


    toDate(timestp: any): Date {
        if (timestp.seconds) {
            return new Date(timestp.seconds * 1000);

        } else {
            return new Date();
        }
    }


}

