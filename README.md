# Pragmatic UI

## Version Notes

### Version 2

For version 2 and below Mui (an its depenedcies) were specifcied as a dependancy.

### Version 3

For version 3 and above, Mui is a peer dependency, so you will have to install it yourself. Version 3 and above uses @mui/x-date-pickers Version 7.

`date-fns` has been upgrade to version 3, so ensure that you are importing the correct AdapterDateFns for your `LocalizationProvider`. See MUI [getting started](https://mui.com/x/react-date-pickers/getting-started/) for more

```javascript
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
```

If you are migrating, be sure to read the MUI [migration docs to v6](https://mui.com/x/migration/migration-pickers-v5/) end the [migration docs to v7](https://mui.com/x/migration/migration-pickers-v6/)
