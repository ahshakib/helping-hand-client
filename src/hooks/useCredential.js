import { useEffect, useState } from "react";

const useCredential = () => {
    const id = localStorage.getItem("userId");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [slots, setSlots] = useState([]);
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [service, setService] = useState({});
    const [employee, setEmployee] = useState({});
    const [slot, setSlot] = useState({});
    const [bookings, setBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    const [employeePayments, setEmployeePayments] = useState([]);

    // get single user by id
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/user/${id}`);
                    const result = await response.json();
                    console.log('[useCredential] Fetch user response:', result);
                    // Defensive check: ensure result.user exists before setting
                    if (result.user) {
                        setUser(result.user);
                    } else {
                        console.warn('[useCredential] User not found or result.user is undefined');
                        localStorage.removeItem("userId");
                        setUser({});
                    }
                } catch (error) {
                    console.error('[useCredential] Error fetching user:', error);
                    localStorage.removeItem("userId");
                    setUser({});
                }
            };
            fetchData();
        } else {
            setUser({});
        }
    }, [id]);

    const logout = () => {
        localStorage.removeItem("userId");
        setUser({});
    };

    // fetch users
    useEffect(() => {
        // Defensive check: only fetch if user exists and has admin role
        if (!user || user.role !== 'admin') return;
        
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/user");
                const result = await response.json();

                if (result.status) {
                    setUsers(result.users);
                } else {
                    setUsers([]);
                }
            } catch (error) {
                setUsers([]);
            }
        };
        fetchData();
    }, [user.role]);

    // fetch categories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/categories");
                const result = await response.json();

                if (result.status) {
                    setCategories(result.categories);
                } else {
                    setCategories([]);
                }
            } catch (error) {
                setCategories([]);
            }
        };
        fetchData();
    }, []);

    // fetch slots
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/slots");
                const result = await response.json();

                if (result.status) {
                    setSlots(result.slots);
                } else {
                    setSlots([]);
                }
            } catch (error) {
                setSlots([]);
            }
        };
        fetchData();
    }, []);

    // fetch services
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/services");
                const result = await response.json();

                if (result.status) {
                    setServices(result.services);
                } else {
                    setServices([]);
                }
            } catch (error) {
                setServices([]);
            }
        };
        fetchData();
    }, []);

    //fetch employees
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/employees");
                const result = await response.json();

                if (result.status) {
                    setEmployees(result.employees);
                } else {
                    setEmployees([]);
                }
            } catch (error) {
                setEmployees([]);
            }
        };
        fetchData();
    }, []);

    // fetch payments by email
    useEffect(() => {
        // Defensive check: only fetch if user exists and has user role
        if (!user || user.role !== 'user') return;
        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/payments/${user.email}`);
                const result = await response.json();
                if (result.status) {
                    setBookings(result.payments);
                } else {
                    setBookings([]);
                }
            } catch (error) {
                setBookings([]);
            }
        }
        fetchData();
    }, [user.role, user.email])

    // fetch all bookings
    useEffect(() => {
        // Defensive check: only fetch if user exists and has admin role
        if (!user || user.role !== 'admin') return;
        
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/bookings");
                const result = await response.json();
                if (result.status) {
                    setAllBookings(result.bookings);
                } else {
                    setAllBookings([]);
                }
            } catch (error) {
                setAllBookings([]);
            }
        }
        fetchData();
    }, [user.role])

    // fetch employee payments
    useEffect(() => {
        // Defensive check: only fetch if user exists and has employee role
        if (!user || user.role !== 'employee') return;
        
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/employee-payments/${user.name}`);
                const result = await response.json();
                if (result.status) {
                    setEmployeePayments(result.payments);
                } else {
                    setEmployeePayments([]);
                }
            } catch (error) {
                setEmployeePayments([]);
            }
        }
        fetchData();
    }, [user.role, user.name])


    return {
        user,
        setUser,
        users,
        setUsers,
        logout,
        categories,
        setCategories,
        slots,
        setSlots,
        services,
        setServices,
        employees,
        setEmployees,
        service,
        setService,
        employee,
        setEmployee,
        slot,
        setSlot,
        bookings,
        setBookings,
        allBookings,
        setAllBookings,
        employeePayments,
        setEmployeePayments,
    };
};

export default useCredential;