import { Box, Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import * as projectsApi from '../Apis/projectsApis';
import { useEffect, useState } from 'react';
import { useProjectsContext } from '../Context/projectsContext';
import { Add, ArrowDownward, ArrowUpward, Delete } from '@mui/icons-material';
import AddProjectModal from '../Components/Modals/addProjectModal';
import { Project } from '../Models/project';
import { produce } from 'immer';

const Projects = () => {
  const theme = useTheme();
  const { projects, setProjects, removeProject } = useProjectsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);
  const [isAsc, setIsAsc] = useState(false);

  const sortableHeader = 'step';

  const compare = (a: Project, b: Project) => {
    if (a.step === undefined || b.step === undefined)
      return 0;

    if (a.step < b.step) {
      return isAsc ? 1 : -1;
    }

    if (a.step > b.step) {
      return isAsc ? -1 : 1;
    }

    return 0;
  }

  const sortRows = (col: string) => {
    if (col === sortableHeader) {
      const newProject = produce(projects, draft => draft.sort(compare));

      setProjects(newProject);
      setIsAsc(!isAsc);
    }
  }

  useEffect(() => {
    const getProjects = async () => {
      const projects = await projectsApi.getAll();
      setProjects(projects);
    }

    getProjects();
  }, [setProjects]);

  useEffect(() => {
    if (projectToEdit !== undefined) {
      setIsOpen(true);
    }
  }, [projectToEdit])

  return (
    <Box>
      <AddProjectModal isOpen={isOpen} setIsOpen={setIsOpen} onClose={() => setProjectToEdit(undefined)} project={projectToEdit} />

      <Button variant='outlined' onClick={() => setIsOpen(!isOpen)} startIcon={<Add />}>
        Add a project
      </Button>

      <TableContainer sx={{ padding: 5 }}>
        <Table width="100%" size="small">
          {
            projects.length <= 0 ? (
              <TableHead>
                <TableRow>
                  <TableCell>Nothing to show here</TableCell>
                </TableRow>
              </TableHead>
            ) :
              (
                <>
                  <TableHead>
                    <TableRow>
                      {
                        Object.keys(projects[0]).map(k => (
                          <TableCell
                            key={k}
                            onClick={() => sortRows(k)}
                            sx={{
                              ...(k === sortableHeader && {
                                ":hover": {
                                  cursor: 'pointer',
                                  backgroundColor: theme.palette.grey[200],
                                  transition: 'background .3s'
                                }
                              })
                            }}>
                            <Typography display="flex" alignItems='center' sx={{ fontWeight: 700, textTransform: "capitalize" }}>
                              {k === 'step' ? (isAsc ? <ArrowUpward fontSize='small' /> : <ArrowDownward fontSize='small' />) : ''} {k}
                            </Typography>
                          </TableCell>
                        ))
                      }
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      projects.map(p => (
                        <TableRow onClick={() => setProjectToEdit(p)} key={p.id} sx={{
                          ":hover": {
                            cursor: 'pointer',
                            backgroundColor: theme.palette.grey[200],
                            transition: 'background .3s'
                          }
                        }}>
                          <TableCell>{p.id}</TableCell>
                          <TableCell>{p.name}</TableCell>
                          <TableCell>{p.description}</TableCell>
                          <TableCell>{p.comment}</TableCell>
                          <TableCell>{p.step}</TableCell>
                          <TableCell>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();

                                projectsApi.remove(p.id as number).then((res) => {
                                  if (res.ok) {
                                    removeProject(p.id as number);
                                  }
                                })
                              }}
                              sx={{
                                ':hover': {
                                  color: theme.palette.error.main,
                                  transition: 'color .3s'
                                }
                              }}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </>
              )
          }
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Projects;