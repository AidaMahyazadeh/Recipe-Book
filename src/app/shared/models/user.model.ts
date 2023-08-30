export class User{
    constructor(
        public email :string,
        public id : string,
        private _token :string,
        private _tokenExpirstionDate :Date
    ){}

    get token(){
        if (!this._tokenExpirstionDate ||new Date() > this._tokenExpirstionDate){
          return null;
        }
        return this._token;
    }
}