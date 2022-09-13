import FirebaseContainer from '../containers/FirebaseContainer.js'

class FirebaseMessageDao extends FirebaseContainer {
    constructor() {
        super('messages');
    }

}

export default FirebaseMessageDao;