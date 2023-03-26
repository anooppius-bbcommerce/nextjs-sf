// @ts-nocheck
import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "@/components";
import { contextToRegionQuery } from "@/lib/regions";
import {
  RootCategoriesQuery,
  RootCategoriesQueryVariables,
  RootCategoriesDocument,
} from "@/saleor/api";
import { serverApolloClient } from "@/lib/auth/useAuthenticatedApolloClient";
import CheckoutForm from "@/lib/checkout/CheckoutForm";
import { usePaths } from "@/lib/paths";
import { useCheckout } from "@/lib/providers/CheckoutProvider";
import CheckoutSidebar from "@/lib/checkout/sidebar/CheckoutSidebar";
import {
  Box,
  Grid
} from "@mui/material";

function CheckoutPage({ locale }) {
  const router = useRouter();
  const paths = usePaths();
  const { checkout, loading } = useCheckout();

  useEffect(() => {
    // Redirect to cart if theres no checkout data
    if (!loading && (!checkout || !checkout.lines?.length)) {
      void router.push(paths.$url());
    }
  });

  const isCheckoutLoading = loading || typeof window === "undefined";
  if (isCheckoutLoading) {
    return (
      <>
        <div title="Checkout" />
      </>
    );
  }

  if (!checkout || checkout.lines?.length === 0) {
    return <div title="Checkout" />;
  }

  return (
    <Grid item sx={{ border: '0px solid #f6f6f6', color: '#343434' }}>
      <Grid container xs={12} >
        <Grid xs={8} sx={{ border: "0px solid" }}>
          <Box sx={{ m: 5, backgroundColor: "#f6f6f6", p: 3, }}>
            <CheckoutForm locale={locale} />
          </Box>
        </Grid>
        <Grid xs={4} sx={{ border: "0px solid" }}>
          <Box sx={{ m: 5, backgroundColor: "#f6f6f6", p: 3, }}>
            <CheckoutSidebar checkout={checkout} locale={locale} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default CheckoutPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) {
    return {
      props: {},
      notFound: true,
    };
  }
  const locale = contextToRegionQuery(context).locale;
  const response: ApolloQueryResult<RootCategoriesQuery> =
    await serverApolloClient.query<
      RootCategoriesQuery,
      RootCategoriesQueryVariables
    >({
      query: RootCategoriesDocument,
      variables: {
        locale: locale,
      },
    });
  const rootCategories = response.data.categories.edges.map((edge) => ({
    ...edge.node,
  }));

  return {
    props: {
      rootCategories: rootCategories,
      locale
    },
  };
};

CheckoutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};