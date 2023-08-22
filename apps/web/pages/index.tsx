import {
  Badge,
  Box,
  Card,
  Collapse,
  Container,
  Fade,
  List,
  Typography,
} from '@mui/material';
import CustomHead from '../components/seo';
import DropzoneComponent from '../components/ui/upload.component';
import { useSelector } from 'react-redux';
import { selectorFile } from '../store/file';
import { TransitionGroup } from 'react-transition-group';

export function Index() {
  const files = useSelector(selectorFile);

  return (
    <>
      <CustomHead title="Upload" description="Upload file" />
      <section className="page-container">
        <Box sx={{ pt: 10 }}>
          <Container maxWidth="sm">
            <Box sx={{ width: { md: '100%' } }}>
              <DropzoneComponent />
            </Box>
            {files.length ? (
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">Uploaded files</Typography>
                <List>
                  <TransitionGroup>
                    {files?.map((file) => {
                      return (
                        <>
                          <Box sx={{ mt: 1 }}>
                            <Card sx={{ minWidth: 275, p: 2 }}>
                              <Typography sx={{ fontSize: 14 }}>
                                File: {file.name}
                              </Typography>
                              <Typography sx={{ fontSize: 14 }}>
                                Type: {file.type}
                              </Typography>
                              <Typography sx={{ fontSize: 14 }}>
                                Size: {Number(file.size / 1024).toFixed(0)} KB.
                              </Typography>
                            </Card>
                          </Box>
                        </>
                      );
                    })}
                  </TransitionGroup>
                </List>
              </Box>
            ) : (
              ''
            )}
          </Container>
        </Box>
      </section>
    </>
  );
}

export default Index;
