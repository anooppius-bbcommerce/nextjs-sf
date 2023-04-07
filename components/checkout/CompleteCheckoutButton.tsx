/* eslint-disable */ // component will be fulle redesigned
import { Box, Button, Grid, styled, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Looks5Icon from "@mui/icons-material/Looks5";

interface CompleteCheckoutButtonProps {
  isDisabled: boolean;
  isProcessing: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function CompleteCheckoutButton({
  isDisabled,
  isProcessing,
  children,
  onClick,
}: CompleteCheckoutButtonProps) {
  return (
    <>
      {isProcessing ? (
        <button
          type="button"
          disabled
          className="w-full mt-6 bg-green-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="animate-spin h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Processing
        </button>
      ) : (
        <Button
          onClick={onClick}
          disabled={isDisabled}
          type="submit"
          style={{
            backgroundColor: "#ff9905",
            color: "#3A3A3A",
            textTransform: "capitalize",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          {children}
        </Button>
      )}
    </>
  );
}

export default CompleteCheckoutButton;
