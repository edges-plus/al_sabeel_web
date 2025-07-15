import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLedgerTree, fetchLedgerChildren } from "@root/redux/actions/ledgerAction";
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DescriptionIcon from '@mui/icons-material/Description';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 

const TreeNode = ({ node, onExpand }) => {
    const [expanded, setExpanded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();
    const hasChildren = node.is_group;

    const toggle = () => {
        if (!expanded && hasChildren && !node.childrenLoaded) {
            onExpand(node.id);
        }
        setExpanded(!expanded);
    };

    const handlePlusClick = (event) => {
        event.stopPropagation();
        setDialogOpen(true);
    };

    const handleEditClick = (event) => {
        event.stopPropagation();
        if (hasChildren) {
            navigate(`/Settings/LedgerGroup?id=${node.id}`);
        } else {
            navigate(`/Settings/Ledger?id=${node.id}`);
        }
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const handleNavigate = (type) => {
        if (type === 'group') {
            navigate(`/Settings/LedgerGroup?parent_id=${node.id}`);
        } else {
            navigate(`/Settings/Ledger?parent_id=${node.id}`);
        }
        handleClose();
    };

    const icon = hasChildren
        ? expanded
            ? <FolderOpenIcon sx={{ color: '#1976d2', fontSize: 20 }} />
            : <FolderIcon sx={{ color: '#1976d2', fontSize: 20 }} />
        : <DescriptionIcon sx={{ color: '#757575', fontSize: 18 }} />;

    return (
        <li className="tree-node">
            <div className="tree-label" onClick={toggle}>
                <span className="tree-icon">{icon}</span>
                <span className="tree-text">{node.code} - {node.name}</span>

                {(![1, 2, 3, 4, 5, 6, 7].includes(node.id) && hasChildren) && (
                    <>
                        <AddCircleOutlineIcon
                            sx={{ fontSize: 18, cursor: 'pointer', color: '#4caf50', ml: 1 }}
                            onClick={handlePlusClick}
                        />
                        {!node.system_created && (
                            <EditIcon
                                sx={{ fontSize: 18, cursor: 'pointer', color: '#ff9800', ml: 1 }}
                                onClick={handleEditClick}
                            />
                        )}
                    </>
                )}

                {!hasChildren && !node.system_created && (
                    <EditIcon
                        sx={{ fontSize: 18, cursor: 'pointer', color: '#ff9800', ml: 1 }}
                        onClick={handleEditClick}
                    />
                )}
            </div>

            {expanded && (
                <div className={`tree-children-wrapper ${expanded ? 'open' : ''}`}>
                    <ul className="tree-children">
                        {node.children?.map((child) => (
                            <TreeNode key={child.id} node={child} onExpand={onExpand} />
                        ))}
                    </ul>
                </div>
            )}

            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Add new under {node.name}</DialogTitle>
                <DialogContent>
                    Do you want to add a <strong>Group</strong> or a <strong>Ledger</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleNavigate('group')}>Group</Button>
                    <Button onClick={() => handleNavigate('ledger')}>Ledger</Button>
                    <Button onClick={handleClose} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </li>
    );
};


const LedgerTree = () => {
    const dispatch = useDispatch();
    const treeData = useSelector((state) => state.ledger.treeData);

    useEffect(() => {
        dispatch(fetchLedgerTree());
    }, [dispatch]);

    const handleExpand = (parentId) => {
        dispatch(fetchLedgerChildren(parentId));
    };

    return (
        <ul className="ledger-tree">
            {treeData.map((node) => (
                <TreeNode key={node.id} node={node} onExpand={handleExpand} />
            ))}
        </ul>
    );
};

export default LedgerTree;
