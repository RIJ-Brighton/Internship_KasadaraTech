import { useContext } from "react"
import {Stack,Drawer,Paper} from "@mui/material";
import { styled } from '@mui/material/styles';
import {add} from '../pages/Home';
export default function Sidebar() {

    //sidebar
    const {sideBar,setSideBar} = useContext(add);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    return (
        <div>
            <Drawer open={sideBar} onClose={() => setSideBar(false)}>
               <Stack spacing={2} sx={{width:"25vw"}}>
                  <Item>Home</Item>
                  <Item>Products</Item>
                  <Item>About</Item>
               </Stack>
            </Drawer>
      </div>
  )
}