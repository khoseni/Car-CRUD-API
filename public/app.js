document.addEventListener("alpine:init", () => {
    Alpine.data('nissan', () => ({
        nissanCount: null,
        vehicles: [],
        newVehicle: {
            color: '',
            make: '',
            model: '',
            reg_number: ''
        },
        deleteRegNumber: '',

        async fetchNissanCount() {
            try {
                const response = await axios.get('http://localhost:3007/api/nissansFromCK?search=Nissan');

                if (response.data && response.data.search !== undefined) {
                    this.nissanCount = response.data.search;
                } else {
                   
                    this.nissanCount = null;
                }
            } catch (error) {
                console.error('Error fetching Nissan count:', error);
                this.nissanCount = null;
            }
        },


        async fetchVehicles() {
            try {
                const response = await fetch('http://localhost:3007/api/vehicles');
                if (!response.ok) throw new Error('Failed to fetch vehicles');
                this.vehicles = await response.json();
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
        },

        async addVehicle() {
            try {
                const response = await fetch('http://localhost:3007/api/vehicles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.newVehicle)
                });

                if (!response.ok) throw new Error('Failed to add vehicle');
                
                this.newVehicle = { color: '', make: '', model: '', reg_number: '' };
                await this.fetchVehicles();
            } catch (error) {
                console.error('Error adding vehicle:', error);
            }
        },

        async deleteVehicle() {
            try {
                const response = await fetch(`http://localhost:3007/api/vehicles/delete?reg_number=${encodeURIComponent(this.deleteRegNumber)}`, {
                    method: 'GET'
                });

                if (!response.ok) throw new Error('Failed to delete vehicle');
                
                this.deleteRegNumber = '';
                await this.fetchVehicles();
            } catch (error) {
                console.error('Error deleting vehicle:', error);
            }
        }

    }));
});
