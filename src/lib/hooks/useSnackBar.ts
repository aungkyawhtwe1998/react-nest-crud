import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from './../store/index';
import { useSelector } from 'react-redux';
import { toggleSnackBar } from '../store/generalSlice';
const useSnackBar = () =>{
    const {showSnackBar, snackBarText} = useSelector(
        (state: RootState) => state.generalReducer
    );

    const dispatch = useDispatch();
    useEffect(()=> {
        if(showSnackBar === true){
            const timeout = setTimeout(
                ()=> dispatch(toggleSnackBar({show: false, msg:''})),
                5000
            );
            return() => clearTimeout(timeout)
        }
    }, [showSnackBar]);

    function openSnackBar(msg: string){
        dispatch(toggleSnackBar({show: true, msg}));
    }

    return {openSnackBar, showSnackBar, snackBarText};
};

export default useSnackBar;