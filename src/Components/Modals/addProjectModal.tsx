import { Add, Edit } from '@mui/icons-material';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Project } from '../../Models/project';
import * as projectsApis from '../../Apis/projectsApis';
import { useProjectsContext } from '../../Context/projectsContext';

const AddProjectModal = ({
  isOpen,
  setIsOpen,
  onClose,
  project }: {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onClose?: () => void;
    project?: Project
  }) => {
  const isEditMode = project !== undefined && project !== null;

  const { editOrAddProject } = useProjectsContext();
  const [step, setStep] = useState(project ? project.step : "En cours");
  const [isPending, setIsPending] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setStep(event.target.value as string);
  };

  const {
    register,
    handleSubmit,
    reset
  } = useForm<Project>()

  const onSubmit: SubmitHandler<Project> = async (project) => {
    setIsPending(true);

    const projectResult = isEditMode
      ?
      await projectsApis.Edit(project) as Project
      :
      await projectsApis.Add(project) as Project;

    editOrAddProject(projectResult, isEditMode);
    onClose && onClose();
    setIsPending(false);
    reset();
    setIsOpen(false);
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        onClose && onClose();
        reset();
        setIsOpen(false);
      }}
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="stretch" gap={2}>
            {project && <TextField label="Id" defaultValue={project.id} inputProps={{ readOnly: true }} {...register("id")} />}
            <TextField label="Name" defaultValue={project?.name} {...register("name")} />
            <TextField label="Comment" defaultValue={project?.comment} {...register("comment")} />
            <TextField label="Description" defaultValue={project?.description} {...register("description")} />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Step</InputLabel>
              <Select
                {...register("step")}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={step}
                label="step"
                onChange={handleChange}
              >
                <MenuItem value={"En cours"}>En cours</MenuItem>
                <MenuItem value={"En Attente"}>En attente</MenuItem>
                <MenuItem value={"Terminé"}>Terminé</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" type="submit" startIcon={isPending ? <CircularProgress size={14} sx={{ color: "#FFF" }} /> : isEditMode ? <Edit /> : <Add />}>
              {isEditMode ? "Edit" : "Add"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default AddProjectModal;