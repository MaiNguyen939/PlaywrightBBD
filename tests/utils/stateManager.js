class StateManager {
    static userData = {
        name: null,
        email: null,
        password: null
    };

    static setUserData(name, email, password) {
        this.userData = {
            name: name,
            email: email,
            password: password
        };
        console.log('Stored user data:', this.userData);
    }

    static getUserData() {
        if (!this.userData.name || !this.userData.email) {
            throw new Error('User data not initialized. Make sure setUserData is called first.');
        }
        return this.userData;
    }

    static clearUserData() {
        this.userData = {
            name: null,
            email: null,
            password: null
        };
    }
}

module.exports = { StateManager };